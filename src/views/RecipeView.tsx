import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import Header from '../components/Header';
import { IngredientsTable } from '../components/IngredientsTable';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const RecipeView: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const history = useHistory();

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
    firestore
      .collection("recipes")
      .doc(recipeId)
      .delete()
      .then((_) => {
        setTimeout(() => {
          history.push("/")
        }, 500)
      })
      .catch((error: Error) => {
        window.alert(error)
        console.error(error)
      })
  }

  return (
    <>
      <Header />
      <div>
        <Link to="/">back</Link>
        {recipeLoading && <Spinner />}
        {recipe && (
          <>
            <h1>{recipe.name}</h1>
            <p>Created at: {recipe.createdAt.toDate().toLocaleDateString()}</p>
            <h4>Ingredients</h4>
            <IngredientsTable ingredients={recipe.ingredients} />
            <h4>Description</h4>
            <p>{recipe.description}</p>
          </>
        )}
        <Button onClick={() => deleteRecipe()}>
          Delete recipe
        </Button>
        {recipeError}
      </div>
    </>
  )
}

export default RecipeView;