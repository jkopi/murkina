import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { storage } from '../../config/firebase';

interface Props {
  recipe: Recipe;
}

const RecipeItem = ({ recipe }: Props) => {
  let store = storage.child("recipe-images");
  // `recipe-images/${recipe.imageReference}`
  // const [value] = useDownloadURL(getFromStorage(`recipe-images/${recipe.imageReference}`));

  return (
    <Flex flexDir="row" alignItems="center">
     {/* <Text>{recipeImage}</Text>
      </Box> */}
      <Box mb="5" mt="5" width="full">
        <Text fontSize="x-large" fontWeight="bold">
          {recipe.name}
        </Text>
        <Box mb="2">
          <Text>
            <i>{recipe.description}</i>
          </Text>
        </Box>
        <Box mt="3">
          <Link to={`/recipe/${recipe.id}`}>
            <Text fontSize="sm" fontWeight="bold" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
              View recipe
            </Text>
          </Link>
        </Box>
        <Divider />
      </Box>
    </Flex>
  );
};

export default RecipeItem;
