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

// Твоя конфигурация Firebase (замени на свои данные)
const firebaseConfig = {
    apiKey: "AIzaSyA2hCxXsLcEWltXEw3sL6HyrzdSOYoMYFg",
    authDomain: "my-cooking-book-74cb2.firebaseapp.com",
    databaseURL: "https://my-cooking-book-74cb2-default-rtdb.firebaseio.com",
    projectId: "my-cooking-book-74cb2",
    storageBucket: "my-cooking-book-74cb2.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef123456"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Путь к рецептам в базе данных
const RECIPES_PATH = '/';

// ============ ФУНКЦИИ ДЛЯ РАБОТЫ С REALTIME DATABASE ============

// 1. Получить все рецепты (один раз)
export const fetchRecipes = async () => {
    try {
        const recipesRef = ref(database, RECIPES_PATH);
        const snapshot = await get(recipesRef);

            console.log('📊 Данные из Firebase:', snapshot.val());
        
        if (snapshot.exists()) {
            const data = snapshot.val();

            console.log('📊 Тип данных:', typeof data);
            console.log('📊 Данные:', data);

// Проверяем, что данные - это объект
            if (typeof data === 'object' && data !== null) {

            // Преобразуем объект в массив
            const recipesList = Object.keys(data).map(key => ({
                firebaseId: key,
                ...data[key]
            }));

                console.log('✅ Преобразовано в массив:', recipesList.length, 'рецептов');

            return recipesList;
        } else {
            console.warn('⚠️ Данные не являются объектом:', data);
            return [];
        }
    } else {
      console.log('ℹ️ В базе данных нет рецептов');
            return [];   
    }
    } catch (error) {
        console.error('Ошибка загрузки рецептов:', error);
        return [];
    }

// 2. Подписка на изменения в реальном времени
try {
        const unsubscribe = subscribeToRecipes((newRecipes) => {
            console.log('🔄 Получены обновления из Firebase:', newRecipes);
            
            if (Array.isArray(newRecipes)) {
                recipes = newRecipes;
                if (onRecipesChange) {
                    onRecipesChange(newRecipes);
                }
            } else {
                console.warn('⚠️ Получены некорректные данные из Firebase:', newRecipes);
            }
        });
        listeners.push(unsubscribe);

        
    } catch (error) {
        console.error('❌ Ошибка подписки на изменения:', error);
    }
    
    return () => {
        listeners.forEach(unsubscribe => unsubscribe());
        listeners = [];
    };
};
// 3. Добавить новый рецепт
export const addRecipeToFirebase = async (recipeData) => {
    try {
        const recipesRef = ref(database, RECIPES_PATH);
        const newRecipeRef = push(recipesRef);
        
        // Получаем максимальный id для автоинкремента
        const recipes = await fetchRecipes();
        const maxId = recipes.reduce((max, r) => Math.max(max, parseInt(r.id) || 0), 0);
        
        const newRecipe = {
            ...recipeData,
            id: String(maxId + 1),
            createdAt: new Date().toISOString()
        };
        
        await set(newRecipeRef, newRecipe);
        
        return {
            firebaseId: newRecipeRef.key,
            ...newRecipe
        };
    } catch (error) {
        console.error('Ошибка добавления рецепта:', error);
        throw error;
    }
};

// 4. Обновить рецепт
export const updateRecipeInFirebase = async (firebaseId, updatedData) => {
    try {
        const recipeRef = ref(database, `${RECIPES_PATH}/${firebaseId}`);
        await update(recipeRef, {
            ...updatedData,
            updatedAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error('Ошибка обновления рецепта:', error);
        throw error;
    }
};

// 5. Удалить рецепт
export const deleteRecipeFromFirebase = async (firebaseId) => {
    try {
        const recipeRef = ref(database, `${RECIPES_PATH}/${firebaseId}`);
        await remove(recipeRef);
        return true;
    } catch (error) {
        console.error('Ошибка удаления рецепта:', error);
        throw error;
    }
};

// 6. Импортировать рецепты (для первого заполнения)
export const importRecipesToFirebase = async (recipesArray) => {
    try {
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
        console.error('Ошибка импорта:', error);
        throw error;
    }
};

export default database;