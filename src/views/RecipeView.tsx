import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { IngredientsTable } from '../components/IngredientsTable';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const RecipeContainer = styled.div``;

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
    const wantToDelete = window.confirm("Sure about that?");
    if (wantToDelete) {
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
  }

  return (
    <Layout>
      <div>
        <Link to="/">back</Link>
        {recipeLoading && <Spinner />}
        {recipe && (
          <RecipeContainer>
            <h1>{recipe.name}</h1>
            <p>Created at: {recipe.createdAt.toDate().toLocaleDateString()}</p>
            <h2>Ingredients</h2>
            <hr />
            <IngredientsTable ingredients={recipe.ingredients} />
            <h2>Description</h2>
            <hr />
            <p>{recipe.description}</p>
          </RecipeContainer>
        )}
        <Button onClick={() => deleteRecipe()}>
          Delete recipe
        </Button>
        {recipeError}
      </div>
    </Layout>
  )
}

export default RecipeView;