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

function AddRecipeForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    recipe: '',
    ganre: 'breakfast',
    image: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.recipe) {
      alert('Пожалуйста, заполните название и рецепт');
      return;
    }
    onSave(formData);
  };
  
  return (
    <ModalOverlay onClick={onCancel}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>➕ Новый рецепт</h2>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Название блюда *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Например: Овсяноблин"
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
              placeholder="Ингредиенты:&#10;2 ст.л. овсянки&#10;1 яйцо&#10;&#10;Приготовление:&#10;Все смешать. Жарить на сковороде..."
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label>Ссылка на изображение (необязательно)</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </FormGroup>
          
          <ButtonGroup>
            <Button type="button" onClick={onCancel}>Отмена</Button>
            <Button type="submit" primary>Сохранить</Button>
          </ButtonGroup>
        </form>
      </Modal>
    </ModalOverlay>
  );
}

export default AddRecipeForm;