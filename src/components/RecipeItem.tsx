import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Recipe } from '../interfaces/Recipe';
import { Button } from './Button';

const Item = styled.div`
  width: 100%;
  margin: 1rem;
  border-bottom: 1px solid #cfcfcf;
`;

const ItemHeading = styled.h2`
  font-size: 1.5rem;
`;

interface Props {
  recipe: Recipe;
}

const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <Item>
      <ItemHeading>{recipe.name}</ItemHeading>
      <Link to={`/recipe/${recipe.id}`}>
        <Button style={{ border: "2px #ca4a00 solid", padding: ".5rem" }}>
          VIEW RECIPE
        </Button>
      </Link>
      <p>{recipe.description}</p>
    </Item>
  )
}

export default RecipeItem
