import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getGenreName, formatRecipeText } from '../data/recipes';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  padding: 20px;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  max-width: 800px;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  
  @keyframes slideUp {
    from { 
      transform: translateY(30px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    max-height: 100vh;
    max-width: 100vw;
    border-radius: 0;
    min-height: 100vh;
    width: 100%;
    padding: 0;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  z-index: 10000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
  
  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    font-size: 24px;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const ModalImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 24px 24px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  position: relative;
  
  @media (max-width: 768px) {
    height: 300px;
    border-radius: 0;
  }
`;

const ModalImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 30px 30px;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  
  @media (max-width: 768px) {
    padding: 30px 20px 20px;
  }
`;

const ModalTitle = styled.h2`
  color: white;
  font-size: 2.2rem;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ModalBadge = styled.span`
  display: inline-block;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const ModalBody = styled.div`
  padding: 30px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ModalSection = styled.div`
  margin-bottom: 25px;
  
  h3 {
    color: #333;
    font-size: 1.2rem;
    margin: 0 0 12px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    
    &:before {
      content: '';
      flex: 1;
      height: 1px;
      background: #eee;
    }
  }
  
  p {
    color: #555;
    line-height: 1.8;
    font-size: 1.1rem;
    white-space: pre-wrap;
    margin: 0;
  }
`;

const RecipeFullText = styled.p`
  color: #555;
  line-height: 1.8;
  font-size: 1.3rem;
  white-space: pre-wrap;
  margin: 0;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #ff6b35;
`;

function RecipeModal({ recipe, isOpen, onClose }) {
  const getGenreColor = (genre) => {
    const colors = {
      'breakfast': '#4caf50',
      'supper': '#ff9800',
      'dinner': '#f44336',
      'snack': '#9c27b0'
    };
    return colors[genre] || '#ff6b35';
  };
  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  if (!recipe) return null;

       // Форматируем текст рецепта
  const formattedRecipe = formatRecipeText(recipe.recipe);
    
  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        
        <ModalImage $imageUrl={recipe.image}>
          {!recipe.image && '🍲'}
          <ModalImageOverlay>
            <ModalTitle>{recipe.name}</ModalTitle>
          </ModalImageOverlay>
        </ModalImage>
        
        <ModalBody>
          <ModalSection>
            <RecipeFullText>{formattedRecipe}</RecipeFullText>
          </ModalSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}

export default RecipeModal;