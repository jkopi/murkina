import React from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { RecipeForm } from '../components/RecipeForm/RecipeForm';


const CreateRecipeView: React.FC = () => {

  return (
    <Layout>
      <Link to="/">back</Link>
      <RecipeForm />
    </Layout>
  )
}

export default CreateRecipeView