import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import Layout from '../components/Layout';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';


const FoodListView: React.FC = () => {

  const [
    recipe, recipeLoading, recipeError
  ] = useDocument<Recipe>(
    firestore.doc("recipes/q5d6r0TBndEGoX3LpeuQ")
  );

  return (
    <Layout>
      <>
        {recipeError && <strong>Error: {JSON.stringify(recipeError)}</strong>}
        {recipeLoading && <span>Document: Loading...</span>}
        {recipe && <span>Document: {JSON.stringify(recipe.data())}</span>}
      </>
    </Layout>
  )
}

export default FoodListView;