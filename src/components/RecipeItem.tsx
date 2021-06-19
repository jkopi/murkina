import { Box, Button, Divider, Text } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { Recipe } from '../interfaces/Recipe';

interface Props {
  recipe: Recipe;
}

const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <Box mb="5" mt="5">
      <Text fontSize="x-large">{recipe.name}</Text>
      <Link to={`/recipe/${recipe.id}`}>
        <Button border="1px" variant="outline" borderColor="orange.500" colorScheme="orange" textColor="brand.900">
          view recipe
        </Button>
      </Link>
      <Box mb="2" mt="2">
        <Text>{recipe.description}</Text>
      </Box>
      <Divider />
    </Box>
  )
}

export default RecipeItem
