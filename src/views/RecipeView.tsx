import React, { useEffect, useState } from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientsTable } from '../components/IngredientsTable';
import Layout from '../components/Layout';
import { CustomModal } from '../components/Modal/CustomModal';
import { EditForm } from '../components/RecipeForm/EditForm';
import { auth, firestore, storage } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  IconButton,
  useDisclosure,
  HStack,
  Divider,
  Spinner,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import { BreadCrumb } from '../components/BreadCrumb';
import { useAuthState } from 'react-firebase-hooks/auth';

const RecipeView = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user] = useAuthState(auth);
  const [image, setImage] = useState<string>('');
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);

  const [recipe, recipeLoading, recipeError] = useDocumentDataOnce<Recipe>(
    firestore.collection('recipes').doc(recipeId)
  );

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

  const fetchImage = async () => {
    await storage
      .child(`recipe-images/${recipe && recipe.imageReference}`)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      });
  };

  if (recipe && recipe.imageReference) {
    fetchImage();
  }

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
          </Flex>
          <Text>Created at: {recipe.createdAt.toDate().toLocaleDateString()}</Text>
          <Flex mt="5" justifyContent="center">
            {!image ? <Spinner /> : <Image src={image} width="600px" alt={recipe.imageReference} />}
          </Flex>
          <Box mt="10" mb="10">
            <Heading size="lg">Ingredients</Heading>
            <IngredientsTable ingredients={recipe.ingredients} />
          </Box>
          <Box mt="8" mb="5">
            <Box mb="5">
              <Heading size="lg">Description</Heading>
            </Box>
            <Box w="100%" p="4" mt="2" borderWidth="1px" borderRadius="lg">
              <p>{recipe.description}</p>
            </Box>
          </Box>
          {user && (
            <HStack>
              <Button colorScheme="orange" onClick={onOpen}>
                Edit recipe
              </Button>
              <Button colorScheme="red" onClick={() => deleteRecipe()}>
                Delete recipe
              </Button>
            </HStack>
          )}
        </>
      )}
      {recipeError}
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <EditForm id={recipeId} data={recipe} />
      </CustomModal>
    </Layout>
  );
};

export default RecipeView;
