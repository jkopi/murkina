import React, { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Header from '../components/Header';
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
            <h4>{recipe.name}</h4>
            <p>{recipe?.description}</p>
            <p>{recipe.createdAt.toDate().toLocaleDateString()}</p>
          </>
        )}
        <Button onClickEvent={() => deleteRecipe()}>
          Delete recipe
        </Button>
      {recipeError}
    </div>
  </>
)
}

export default RecipeView;