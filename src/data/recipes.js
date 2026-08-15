// src/data/recipes.js

import { 
    subscribeToRecipes, 
    addRecipeToFirebase, 
    updateRecipeInFirebase, 
    deleteRecipeFromFirebase,
    clearAllRecipes,
    fetchRecipes
} from '../firebase';

// Состояние рецептов
let recipes = [];
let listeners = [];

// ============ ФУНКЦИИ ДЛЯ РАБОТЫ С ДАННЫМИ ============

// Инициализация подписки на Firebase
export const initFirebaseSync = (onRecipesChange) => {
    console.log('🔄 Инициализация синхронизации с Firebase...');
    
    // Отписываемся от старых подписок
    listeners.forEach(unsubscribe => unsubscribe());
    listeners = [];
    
    // Сначала загружаем данные один раз
    fetchRecipes().then((loadedRecipes) => {
        console.log('📥 Загружено рецептов из Firebase:', loadedRecipes);
        
        // Проверяем, что данные - это массив
        if (Array.isArray(loadedRecipes) && loadedRecipes.length > 0) {
            recipes = loadedRecipes;
            if (onRecipesChange) {
                onRecipesChange(loadedRecipes);
            }
        } else {
            console.warn('⚠️ Нет рецептов в Firebase или данные не в формате массива');
            recipes = [];
            if (onRecipesChange) {
                onRecipesChange([]);
            }
        }
    }).catch(error => {
        console.error('❌ Ошибка загрузки рецептов:', error);
        recipes = [];
        if (onRecipesChange) {
            onRecipesChange([]);
        }
    });
    
// Затем подписываемся на изменения в реальном времени
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

// Получить все рецепты
export const getRecipes = () => {
    return recipes;
};

// Получить рецепт по ID
export const getRecipeById = (id) => {
    return recipes.find(recipe => String(recipe.id) === String(id));
};

// Получить уникальные категории
export const getCategories = () => {
    if (!Array.isArray(recipes) || recipes.length === 0) {
        return ['all'];
    }
    const categories = [...new Set(recipes.map(recipe => recipe.ganre))];
    return ['all', ...categories];
};

// Фильтрация рецептов
export const filterRecipes = (searchTerm, category) => {
    if (!Array.isArray(recipes)) {
        return [];
    }
    
    let filtered = [...recipes];
    
    if (searchTerm) {
        filtered = filtered.filter(recipe =>
            recipe.name && recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (category && category !== 'all') {
        filtered = filtered.filter(recipe => recipe.ganre === category);
    }
    
    return filtered;
};

// Добавление рецепта
export const addRecipe = async (newRecipe) => {
    try {
        const addedRecipe = await addRecipeToFirebase(newRecipe);
        console.log('✅ Рецепт добавлен:', addedRecipe);
        recipes.push(addedRecipe);
        return addedRecipe;
    } catch (error) {
        console.error('❌ Ошибка добавления рецепта:', error);
        throw error;
    }
};

// Обновление рецепта
export const updateRecipe = async (updatedRecipe) => {
    try {
         // Проверяем, есть ли firebaseId
        if (!updatedRecipe.firebaseId) {
            console.error('❌ Нет firebaseId для обновления');
            console.log('📋 Данные рецепта:', updatedRecipe);
  // Пытаемся найти firebaseId по id
            const existingRecipe = recipes.find(r => String(r.id) === String(updatedRecipe.id));
            if (existingRecipe && existingRecipe.firebaseId) {
                console.log('🔍 Найден существующий рецепт с firebaseId:', existingRecipe.firebaseId);
                updatedRecipe.firebaseId = existingRecipe.firebaseId;
            } else {
                throw new Error('Не найден firebaseId для обновления. Рецепт не существует в Firebase.');
            }
        }

        const { firebaseId, ...recipeData } = updatedRecipe;


        await updateRecipeInFirebase(firebaseId, {
            ...recipeData,
            updatedAt: new Date().toISOString()
    });
 const index = recipes.findIndex(r => r.firebaseId === firebaseId);
        if (index !== -1) {
            recipes[index] = { ...recipes[index], ...updatedRecipe };
        }
        
        console.log('✅ Рецепт обновлен:', updatedRecipe.name);
        return true;
    } catch (error) {
        console.error('❌ Ошибка обновления рецепта:', error);
        throw error;
    }
};

// Удаление рецепта
export const deleteRecipe = async (id) => {
    try {
        const recipe = recipes.find(r => String(r.id) === String(id));
        if (!recipe) {
            throw new Error('Рецепт не найден');
        }
        await deleteRecipeFromFirebase(recipe.firebaseId);
        console.log('✅ Рецепт удален:', recipe.name);
        return true;
    } catch (error) {
        console.error('❌ Ошибка удаления рецепта:', error);
        throw error;
    }
};

// Экспорт рецептов (для бэкапа)
export const exportRecipes = () => {
    if (!Array.isArray(recipes) || recipes.length === 0) {
        alert('Нет рецептов для экспорта');
        return;
    }
    
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `cookbook_backup_${new Date().toISOString().slice(0, 19)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// Импорт рецептов из JSON
export const importRecipes = async (jsonFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedRecipes = JSON.parse(e.target.result);
                if (Array.isArray(importedRecipes)) {
                    const { importRecipesToFirebase } = await import('../firebase');
                    const count = await importRecipesToFirebase(importedRecipes);
                    console.log(`✅ Импортировано ${count} рецептов`);
                    resolve(count);
                } else {
                    reject(new Error('Неверный формат файла'));
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(jsonFile);
    });
};

// Сброс к начальным рецептам
export const resetToDefault = async () => {
    try {
        // Очищаем все рецепты
        await clearAllRecipes();
        
        // Добавляем начальные рецепты
        const { importRecipesToFirebase } = await import('../firebase');
        const initialRecipes = await import('./initialRecipes');
        const recipesData = initialRecipes.default || initialRecipes;
        
        if (Array.isArray(recipesData)) {
            await importRecipesToFirebase(recipesData);
            console.log('✅ Сброс к начальным рецептам выполнен');
        } else {
            throw new Error('Начальные рецепты не являются массивом');
        }
        
        return true;
    } catch (error) {
        console.error('❌ Ошибка сброса:', error);
        throw error;
    }
};

// Перевод жанров на русский
export const getGenreName = (genre) => {
    const genres = {
        'breakfast': 'Завтрак',
        'supper': 'Ужин',
        'dinner': 'Обед',
        'snack': 'Перекус/Десерт'
    };
    return genres[genre] || genre;
};

// Функция для форматирования текста
export const formatRecipeText = (text) => {
    if (!text) return '';
    
    let formatted = text;
    formatted = formatted.replace(/\s+/g, ' ');
    formatted = formatted.replace(/, (?![0-9])/g, ',\n');
    formatted = formatted.replace(/,(?![0-9])/g, ',\n');
    formatted = formatted.replace(/ {2,}/g, '\n');
    formatted = formatted.replace(/;\s*/g, ';\n');
    formatted = formatted.replace(/:\s*/g, ':\n');
    formatted = formatted.replace(/\. (?![гмлт]\.)/g, '.\n');
    formatted = formatted.replace(/\n\s+/g, '\n');
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    formatted = formatted.split('\n')
        .map(line => line.trim())
        .join('\n');
    
    return formatted;
};