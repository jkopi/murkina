import React from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { CreationForm } from '../components/RecipeForm/CreationForm';

const CreateRecipeView: React.FC = () => {

  return (
    <Layout>
      <Link to="/">back</Link>
      <CreationForm />
    </Layout>
  )
}

export default CreateRecipeView