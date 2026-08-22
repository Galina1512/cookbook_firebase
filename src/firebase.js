import { initializeApp } from 'firebase/app';
import { 
    getDatabase, 
    ref, 
    get, 
    set, 
    update, 
    remove, 
    onValue,
    push
} from 'firebase/database';
import { 
    getStorage, 
    ref as storageRef,  // Переименовываем ref для Storage, чтобы не путать с БД
    uploadBytes, 
    getDownloadURL,
    deleteObject
} from 'firebase/storage';

// Твоя конфигурация Firebase
const firebaseConfig = {
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Путь к рецептам
const RECIPES_PATH = '/';

// ============ ВСЕ ФУНКЦИИ ДЛЯ РАБОТЫ С БАЗОЙ ============

// 1. Получить все рецепты (один раз)
export const fetchRecipes = async () => {
    try {
        console.log('📊 Запрос к Firebase по пути:', RECIPES_PATH);
        const recipesRef = ref(database, RECIPES_PATH);
        const snapshot = await get(recipesRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            if (typeof data === 'object' && data !== null) {
                const recipesList = Object.keys(data).map(key => ({
                    firebaseId: key,
                    ...data[key]
                }));
                console.log('✅ Загружено рецептов:', recipesList.length);
                return recipesList;
            }
        }
        return [];
    } catch (error) {
        console.error('❌ Ошибка загрузки рецептов:', error);
        return [];
    }
};

// 2. ✅ ПОДПИСКА НА ИЗМЕНЕНИЯ
export const subscribeToRecipes = (callback) => {
    console.log('🔗 Подписка на изменения в Firebase');
    const recipesRef = ref(database, RECIPES_PATH);
    
    const unsubscribe = onValue(recipesRef, (snapshot) => {
        console.log('🔄 Получены изменения из Firebase');
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            
            if (typeof data === 'object' && data !== null) {
                const recipesList = Object.keys(data).map(key => ({
                    firebaseId: key,
                    ...data[key]
                }));
                console.log('✅ Обновлено:', recipesList.length, 'рецептов');
                callback(recipesList);
            } else {
                callback([]);
            }
        } else {
            console.log('ℹ️ В базе данных нет рецептов');
            callback([]);
        }
    }, (error) => {
        console.error('❌ Ошибка подписки:', error);
        callback([]);
    });
    
    return unsubscribe;
};

// 3. Добавить новый рецепт
export const addRecipeToFirebase = async (recipeData) => {
    try {
        console.log('➕ Добавление рецепта...', recipeData);
        const recipesRef = ref(database, RECIPES_PATH);
        const newRecipeRef = push(recipesRef);
        
        const recipes = await fetchRecipes();
        const maxId = recipes.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
        
        const newRecipe = {
            ...recipeData,
            id: String(maxId + 1),
            createdAt: new Date().toISOString()
        };
        
        await set(newRecipeRef, newRecipe);
        
        const result = {
            firebaseId: newRecipeRef.key,
            ...newRecipe
        };
        
        console.log('✅ Рецепт добавлен:', result);
        return result;
    } catch (error) {
        console.error('❌ Ошибка добавления рецепта:', error);
        throw error;
    }
};

// 4. Обновить рецепт
export const updateRecipeInFirebase = async (firebaseId, updatedData) => {
    try {
        console.log(`✏️ Обновление рецепта: ${firebaseId}`);
        
        if (!firebaseId) {
            throw new Error('firebaseId обязателен для обновления');
        }
        
        const recipeRef = ref(database, `${RECIPES_PATH}${firebaseId}`);
        
        await update(recipeRef, {
            ...updatedData,
            updatedAt: new Date().toISOString()
        });
        
        console.log('✅ Рецепт обновлен');
        return true;
    } catch (error) {
        console.error('❌ Ошибка обновления рецепта:', error);
        throw error;
    }
};

// 5. Удалить рецепт
export const deleteRecipeFromFirebase = async (firebaseId) => {
    try {
        console.log(`🗑️ Удаление рецепта: ${firebaseId}`);
        const recipeRef = ref(database, `${RECIPES_PATH}${firebaseId}`);
        await remove(recipeRef);
        console.log('✅ Рецепт удален');
        return true;
    } catch (error) {
        console.error('❌ Ошибка удаления рецепта:', error);
        throw error;
    }
};

// 6. Импортировать рецепты
export const importRecipesToFirebase = async (recipesArray) => {
    try {
        console.log('📥 Импорт рецептов...');
        const recipesRef = ref(database, RECIPES_PATH);
        let importedCount = 0;
        
        for (const recipe of recipesArray) {
            const newRecipeRef = push(recipesRef);
            await set(newRecipeRef, {
                ...recipe,
                createdAt: new Date().toISOString()
            });
            importedCount++;
            console.log(`✅ Импортирован: ${recipe.name}`);
        }
        
        console.log(`✅ Успешно импортировано ${importedCount} рецептов`);
        return importedCount;
    } catch (error) {
        console.error('❌ Ошибка импорта:', error);
        throw error;
    }
};

// 7. Очистить все рецепты
export const clearAllRecipes = async () => {
    try {
        console.log('🗑️ Очистка всех рецептов...');
        const recipesRef = ref(database, RECIPES_PATH);
        await set(recipesRef, null);
        console.log('✅ Все рецепты удалены');
        return true;
    } catch (error) {
        console.error('❌ Ошибка очистки:', error);
        throw error;
    }
};

// 8. Загрузка картинки в Storage и получение ссылки
export const uploadRecipeImage = async (file, recipeFirebaseId) => {
    if (!file) return null; // Если файла нет, возвращаем null

    try {
        // Создаем уникальный путь для картинки: recipes/ID-рецепта/имя-файла
        const imagePath = `recipes/${recipeFirebaseId}/${file.name}`;
        const imageRef = storageRef(storage, imagePath);
        
        // Загружаем файл в Storage
        console.log(`📤 Загрузка картинки: ${file.name}...`);
        await uploadBytes(imageRef, file);
        
        // Получаем прямую ссылку на картинку
        const downloadURL = await getDownloadURL(imageRef);
        console.log('✅ Картинка загружена, ссылка получена:', downloadURL);
        
        return downloadURL;
    } catch (error) {
        console.error('❌ Ошибка загрузки картинки:', error);
        throw error; // Пробрасываем ошибку наверх
    }
};

// 9. Удаление картинки из Storage
export const deleteRecipeImage = async (imageUrl) => {
    if (!imageUrl) return; // Если нет ссылки, выходим

    try {
        // Создаем ссылку на файл по его URL
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
        console.log('✅ Картинка удалена из Storage');
    } catch (error) {
        console.error('❌ Ошибка удаления картинки:', error);
    }
};

export const storage = getStorage(app);
export default database;