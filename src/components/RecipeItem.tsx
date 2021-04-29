import React from 'react'
import styled from 'styled-components'
import { Recipe } from '../interfaces/Recipe';

const RecipeItemStyle = styled.div`
  border: 1px solid violet;
`;

interface Props {
  recipe: Recipe;
}

const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <RecipeItemStyle>
      <h4>{recipe.name}</h4>
      <p>{recipe.description}</p>
      <p>{recipe.createdAt}</p>
    </RecipeItemStyle>
  )
}

export default RecipeItem
