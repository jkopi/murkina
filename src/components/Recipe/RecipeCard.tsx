import { Box, Button, Divider, Flex, Heading, Image, Stack, Text, Link } from '@chakra-ui/react';
import React, { memo } from 'react';
import { Link as RLink, useNavigate } from 'react-router-dom';
import { Recipe } from '../../interfaces/Recipe';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref, storage } from '../../config/firebase';

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const [value, loading, error] = useDownloadURL(ref(`recipe-images/${recipe.imageReference}`));
  const navigate = useNavigate();

  const goTo = (path: string) => {
    return navigate(path);
  };
  console.log(value);
  console.log(recipe);

  return (
    <Flex direction="column" rounded="md" shadow="md">
      <Flex justifyContent="center" borderBottom="5px solid orange">
        <Image
          src={value}
          boxSize="xs"
          objectFit="fill"
          borderRadius="20px"
          p="4"
          lazy
          cursor="pointer"
          onClick={() => goTo(`/recipe/${recipe.id}`)}
        />
      </Flex>
      <Box p="2">
        <Link as={RLink} fontWeight="bold" fontSize="2xl" to={`/recipe/${recipe.id}`} _hover={{ color: 'orange' }}>
          {recipe.name}
        </Link>
      </Box>
    </Flex>
  );
};
