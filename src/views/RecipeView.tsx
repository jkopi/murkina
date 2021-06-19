import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { IngredientsTable } from '../components/IngredientsTable';
import Layout from '../components/Layout';
import { CustomModal } from '../components/Modal/CustomModal';
import { EditForm } from '../components/RecipeForm/EditForm';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';
import { HiOutlineClipboardCopy } from 'react-icons/hi'
import { Box, Button, Flex, Heading, Text, IconButton, useDisclosure, HStack, Divider, Spinner, Tooltip } from '@chakra-ui/react';
import { BreadCrumb } from '../components/BreadCrumb';

const RecipeView: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const history = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [
    recipe,
    recipeLoading,
    recipeError
  ] = useDocumentDataOnce<Recipe>(
    firestore
      .collection("recipes")
      .doc(recipeId)
  );

  const deleteRecipe = () => {
    const wantToDelete = window.confirm("Sure about that?");

    if (wantToDelete) {
      firestore
        .collection("recipes")
        .doc(recipeId)
        .delete()
        .then((_) => {
          toast.success("Recipe deleted");
          setTimeout(() => {
            history.push("/");
          }, 500)
        })
        .catch((error: Error) => {
          toast.error(`${error}`);
          console.error(error.name);
        })
    }
  }

  return (
    <Layout>
      {recipeLoading && <Spinner />}
      {recipe && (
        <>
          <BreadCrumb recipeName={recipe.name} />
          <Flex mb="2" mt="2" justifyContent="space-between" align="center">
            <Box>
              <Heading>{recipe.name}</Heading>
            </Box>
            <Box>
              <Tooltip label="copy to clipboard">
                <IconButton
                  aria-label="copy to clipboard"
                  icon={<HiOutlineClipboardCopy />}
                  fontSize="30px"
                />
              </Tooltip>
            </Box>
          </Flex>
          <Text>Created at: {recipe.createdAt.toDate().toLocaleDateString()}</Text>
          <Divider mt="2" colorScheme="orange" />
          <Box mt="5" mb="5">
            <Heading size="lg">Ingredients</Heading>
            <IngredientsTable ingredients={recipe.ingredients} />
          </Box>
          <Box mt="8" mb="5">
            <Heading size="lg">Description</Heading>
            <Box w="100%" p="4" mt="2" borderWidth="1px" borderRadius="lg">
              <p>{recipe.description}</p>
            </Box>
          </Box>
          <HStack>
            <Button colorScheme="orange" onClick={onOpen}>
              Edit recipe
            </Button>
            <Button colorScheme="red" onClick={() => deleteRecipe()}>
              Delete recipe
            </Button>
          </HStack>
        </>
      )}
      {recipeError}
      <CustomModal isOpen={isOpen} onClose={onClose}>
        <EditForm id={recipeId} data={recipe} />
      </CustomModal>
    </Layout>
  )
}

export default RecipeView;