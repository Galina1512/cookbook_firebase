import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecipeCard from './components/RecipeCard';
import Sidebar from './components/Sidebar';
import AddRecipeForm from './components/AddRecipeForm';
import { 
    initFirebaseSync, 
    getRecipes, 
    filterRecipes, 
    getCategories, 
    deleteRecipe, 
    addRecipe, 
    updateRecipe 
} from './data/recipes';
import { uploadRecipeImage, deleteRecipeImage } from './firebase'; 
import './App.css';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 30px;
  margin-left: 300px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
    padding-top: 80px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: white;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }
  
  p {
    color: rgba(255,255,255,0.9);
    font-size: 1.1rem;
    margin-top: 10px;
  }
`;

const RecipesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 20px;
  color: #666;
  
  h3 {
    margin-top: 20px;
    color: #333;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px;
  color: white;
  font-size: 1.2rem;
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 20px auto;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  color: #d32f2f;
  max-width: 600px;
  margin: 0 auto;
  
  h3 {
    color: #d32f2f;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 30px;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    
    &:hover {
      background: #e05520;
    }
  }
`;

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Инициализация Firebase при монтировании
  useEffect(() => {
    console.log('🚀 Инициализация приложения...');
    
    try {
      const unsubscribe = initFirebaseSync((newRecipes) => {
        console.log('📥 Получены рецепты в App:', newRecipes);
        
        // Проверяем, что newRecipes - это массив
        if (Array.isArray(newRecipes)) {
          setRecipes(newRecipes);
          setFilteredRecipes(filterRecipes(searchTerm, selectedCategory));
          setLoading(false);
          setError(null);
        } else {
          console.error('❌ Получены некорректные данные (не массив):', newRecipes);
          setError('Получены некорректные данные из базы данных');
          setLoading(false);
        }
      });
    }
    
      // Таймаут для загрузки
  //     const timeoutId = setTimeout(() => {
  //       if (loading) {
  //         setLoading(false);
  //         setError('Превышено время ожидания загрузки данных');
  //       }
  //     }, 10000);
      
  //     return () => {
  //       if (unsubscribe) unsubscribe();
  //       clearTimeout(timeoutId);
  //     };
    catch (error) {
      console.error('❌ Ошибка инициализации:', error);
      setError(error.message || 'Ошибка подключения к базе данных');
      setLoading(false);
    }
  }, []);
  
  // Обновление фильтра при изменении поиска или категории
  useEffect(() => {
    if (Array.isArray(recipes)) {
      const filtered = filterRecipes(searchTerm, selectedCategory);
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, selectedCategory, recipes]);
  
  const categories = getCategories();
  
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleAddRecipe = async (recipeData, imageFile) => {
    try {
      setLoading(true);

      const savedRecipe = await addRecipe(recipeData); 
      
      if (imageFile && savedRecipe && savedRecipe.firebaseId) {
        const newImageUrl = await uploadRecipeImage(imageFile, savedRecipe.firebaseId);
    
        const updatedRecipeData = {
          ...recipeData, 
          imageUrl: newImageUrl
        };
        await updateRecipe({
          ...updatedRecipeData, firebaseId: savedRecipe.firebaseId
      }); 
    }
      
    setShowAddForm(false);
    } catch (error) {
      console.error('Ошибка добавления:', error);
      alert('Ошибка добавления рецепта. Проверьте консоль.');
    } finally {
      setLoading(false);
  };
}
  
    const handleUpdateRecipe = async (formData, imageFile) => {
    try {
      setLoading(true);
      
      const { firebaseId, image } = formData; // image - это ссылка из текстового поля
      
      if (!firebaseId) {
        throw new Error('Не найден firebaseId для обновления');
      }

      // Проверяем, загрузили ли мы новый файл
      if (imageFile) {
        // Загружаем файл в Storage (он автоматически перезапишет старый файл по этому ID)
        const newImageUrl = await uploadRecipeImage(imageFile, firebaseId);
        
        // Обновляем текстовые данные, заменяя ссылку на новую
        const updatedData = { ...formData, imageUrl: newImageUrl };
        await updateRecipe(updatedData);
      } else {
        // Если файл не меняли, просто обновляем текстовые данные.
        // Если пользователь удалил ссылку вручную в поле, она удалится и из базы.
        await updateRecipe(formData);
      }
      
    } catch (error) {
      console.error('Ошибка обновления:', error);
      alert('Ошибка обновления рецепта. Проверьте консоль.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = async (id, imageUrl) => {
    if (window.confirm('Удалить рецепт?')) {
      try {
        setLoading(true);
      if (imageUrl) {
          await deleteRecipeImage(imageUrl);
        }
        await deleteRecipe(id);
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка удаления рецепта. Проверьте консоль.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Отображение ошибки
  if (error) {
    return (
      <AppContainer>
        <MainContent>
          <ErrorState>
            <span style={{ fontSize: '48px' }}>⚠️</span>
            <h3>Ошибка загрузки данных</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              🔄 Перезагрузить страницу
            </button>
          </ErrorState>
        </MainContent>
      </AppContainer>
    );
  }
  
  if (loading) {
    return (
      <AppContainer>
        <MainContent>
          <LoadingState>
            <div className="spinner"></div>
            <div>📖 Загрузка рецептов из Firebase...</div>
          </LoadingState>
        </MainContent>
      </AppContainer>
    );
  }
  
  return (
    <AppContainer>
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddRecipe={() => setShowAddForm(true)}
        recipeCount={filteredRecipes.length}
        totalRecipes={recipes.length}
      />
      
      <MainContent>
        <Header>
          <h1>📚 Моя кулинарная книга</h1>
          <p>ПП рецепты для здорового питания</p>
          {recipes.length > 0 && (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              ✅ Синхронизация с Firebase активна
            </span>
          )}
        </Header>
        
        {showAddForm && (
          <AddRecipeForm
            onSave={handleAddRecipe}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        
        {filteredRecipes.length === 0 ? (
          <EmptyState>
            <span style={{ fontSize: '48px' }}>🍽️</span>
            <h3>Рецептов не найдено</h3>
            <p>Попробуйте изменить фильтры или добавьте новый рецепт</p>
          </EmptyState>
        ) : (
          <RecipesGrid>
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.firebaseId || recipe.id}
                recipe={recipe}
                onDelete={handleDeleteRecipe}
                onUpdate={handleUpdateRecipe}
              />
            ))}
          </RecipesGrid>
        )}
      </MainContent>
    </AppContainer>
  );
}
export default App;