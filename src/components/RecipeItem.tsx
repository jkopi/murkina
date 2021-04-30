import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Recipe } from '../interfaces/Recipe';

const RecipeItemStyle = styled.div`
  border-bottom: black;
`;

interface Props {
  recipe: Recipe;
}

const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <RecipeItemStyle>
      <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
      <p>{recipe.description}</p>
      <p>{recipe.createdAt.toDate().toDateString()}</p>
    </RecipeItemStyle>
  )
}

export default RecipeItem
