import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { CreationForm } from '../components/RecipeForm/CreationForm';

const CreateRecipeView = () => {
  return (
    <Layout>
      <Box mb="5">
        <Link to="/">
          <Text fontSize="lg" fontWeight="bold" _hover={{textDecoration: "underline"}}>back</Text>
        </Link>
      </Box>
      <CreationForm />
    </Layout>
  );
};

export default CreateRecipeView;
