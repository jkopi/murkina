import React, { useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientsTable } from '../components/IngredientsTable';
import Layout from '../components/Layout';
import { Modal } from '../components/Modal/Modal';
import { EditForm } from '../components/RecipeForm/EditForm';
import { auth, firestore, ref, storage } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Box, Flex, Heading, Text, IconButton, useDisclosure, Spinner, Image, Stack } from '@chakra-ui/react';
import { BreadCrumb } from '../components/BreadCrumb';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDownloadURL } from 'react-firebase-hooks/storage';

const RecipeView = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);

  const [recipe, recipeLoading, recipeError] = useDocumentDataOnce<Recipe>(
    firestore.collection('recipes').doc(recipeId)
  );

  const [value, loading, error] = useDownloadURL(ref(`recipe-images/${recipe && recipe.imageReference}`));

  const deleteRecipe = () => {
    const wantToDelete = window.confirm('Are you sure?');

    if (wantToDelete) {
      firestore
        .collection('recipes')
        .doc(recipeId)
        .delete()
        .then((_) => {
          toast.success('Recipe deleted');
          setTimeout(() => {
            navigate('/');
          }, 500);
        })
        .catch((error: Error) => {
          toast.error(`${error}`);
          console.error(error.name);
        });
    }
  };

  return (
    <Layout>
      {recipeLoading && <Spinner />}
      {recipe && (
        <>
          <BreadCrumb recipeName={recipe.name} />
          <Flex mb="2" mt="8" justifyContent="space-between" align="center">
            <Box>
              <Heading>{recipe.name}</Heading>
            </Box>
            {user && (
              <Stack direction="row">
                <IconButton
                  aria-label="edit-recipe-button"
                  colorScheme="orange"
                  onClick={onOpen}
                  icon={<HiPencil />}
                  size="md"
                  fontSize="2xl"
                  rounded="md"
                />
                <IconButton
                  aria-label="delete-recipe-button"
                  colorScheme="red"
                  onClick={() => deleteRecipe()}
                  icon={<HiTrash />}
                  size="md"
                  fontSize="2xl"
                  rounded="md"
                />
              </Stack>
            )}
          </Flex>
          <Text>Created at: {recipe.createdAt.toDate().toLocaleDateString()}</Text>
          <Flex mt="5" justifyContent="center">
            {!value ? <Spinner /> : <Image src={value} width="600px" alt={recipe.imageReference} />}
          </Flex>
          <Box mt="10" mb="10">
            <Heading size="lg">Ingredients</Heading>
            <IngredientsTable ingredients={recipe.ingredients} />
          </Box>
          <Box mt="8" mb="5">
            <Box mb="5">
              <Heading size="lg">Instructions</Heading>
            </Box>
            <Box w="100%" mt="2">
              <p>{recipe.description}</p>
            </Box>
          </Box>
        </>
      )}
      {recipeError}
      <Modal isOpen={isOpen} onClose={onClose}>
        <EditForm id={recipeId} data={recipe} />
      </Modal>
    </Layout>
  );
};

export default RecipeView;
