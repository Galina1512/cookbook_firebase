import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  
  h2 {
    margin-top: 0;
    color: #333;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #666;
    font-weight: 500;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 14px;
    font-family: inherit;
    
    &:focus {
      outline: none;
      border-color: #ff6b35;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

const FileUploadArea = styled.div`
  margin-bottom: 20px;
`;

const FileLabel = styled.label`
  display: block;
  width: 100%;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  border: 2px dashed #ccc;
  transition: all 0.3s ease;
  color: #666;
  font-size: 14px;
  
  &:hover {
    border-color: #ff6b35;
    background: #fff8f5;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  position: relative;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  
  &:hover {
    background: #cc0000;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ` : `
    background: #f0f0f0;
    color: #666;
  `}
  
  &:hover {
    transform: translateY(-2px);
  }
`;

function EditRecipeForm({ recipe, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    firebaseId: recipe.firebaseId || null, 
    id: recipe.id,
    name: recipe.name || '',
    recipe: recipe.recipe || '',
    ganre: recipe.ganre || 'breakfast',
    image: recipe.image || '' // ⬅️ Вернули текстовое поле для старой ссылки
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Запоминаем файл
      setFormData(prev => ({ ...prev, image: '' })); // Очищаем текстовую ссылку, если загружен файл
    }
  };

  const handleRemoveImage = () => {
    if (imageFile) {
      setImageFile(null); // Удаляем выбранный файл
    } else {
      setFormData(prev => ({ ...prev, image: '' })); // Удаляем текстовую ссылку
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.recipe) {
      alert('Пожалуйста, заполните название и рецепт');
      return;
    }
    setLoading(true);
    try {
      // Передаем оба варианта: текстовые данные и файл
      await onSave(formData, imageFile);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ModalOverlay onClick={onCancel}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>✏️ Редактировать рецепт</h2>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Название блюда *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Название блюда"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label>Категория *</label>
            <select name="ganre" value={formData.ganre} onChange={handleChange}>
              <option value="breakfast">Завтрак</option>
              <option value="supper">Ужин</option>
              <option value="dinner">Обед</option>
              <option value="snack">Перекус/Десерт</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label>Рецепт (ингредиенты и приготовление) *</label>
            <textarea
              name="recipe"
              value={formData.recipe}
              onChange={handleChange}
              placeholder="Ингредиенты и способ приготовления..."
              required
            />
          </FormGroup>
          
          {/* --- БЛОК КАРТИНОК (2 ВАРИАНТА) --- */}
          <FormGroup>
            <label>Ссылка на картинку (если есть готовая)</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              disabled={!!imageFile} // Если выбран файл, поле ссылки блокируется
            />
            <small style={{ color: '#999' }}>
              {imageFile ? '⚠️ Ссылка заблокирована, потому что выбран файл.' : 'Оставьте пустым, если загружаете файл ниже.'}
            </small>
          </FormGroup>

          <FileUploadArea>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontWeight: 500 }}>
              Или загрузите фото из Storage
            </label>
            
            {!imageFile ? (
              <FileLabel>
                🖼️ Нажмите, чтобы выбрать фото
                <HiddenInput type="file" accept="image/*" onChange={handleFileChange} />
              </FileLabel>
            ) : (
              <PreviewContainer>
                <PreviewImage src={URL.createObjectURL(imageFile)} alt="Новое превью" />
                <RemoveImageButton type="button" onClick={handleRemoveImage}>
                  ✕
                </RemoveImageButton>
              </PreviewContainer>
            )}
          </FileUploadArea>
          {/* --- КОНЕЦ БЛОКА --- */}
          
          <ButtonGroup>
            <Button type="button" onClick={onCancel}>Отмена</Button>
            <Button type="submit" primary disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </ModalOverlay>
  );
}

export default EditRecipeForm;