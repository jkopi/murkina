import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';

interface Props {
  recipe: Recipe;
}

export const RecipeListItem = ({ recipe }: Props) => {
  return (
    <Flex flexDir="row" alignItems="center">
      <Box mb="5" mt="5" width="full">
        <Text fontSize="x-large" fontWeight="bold">
          {recipe.name}
        </Text>
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
