import React, { useState } from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import toast from 'react-hot-toast';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { IngredientsTable } from '../components/IngredientsTable';
import Layout from '../components/Layout';
import { Modal } from '../components/Modal';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const RecipeContainer = styled.div``;

const RecipeView: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          console.error(error);
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
        <Button onClick={() => setIsOpen(!isOpen)}>
          Edit recipe
        </Button>
        {' '}
        <Button onClick={() => deleteRecipe()}>
          Delete recipe
        </Button>
        {recipeError}
      </div>
      <Modal isOpen={isOpen}>
        <p>Recipe details...</p>
        <button onClick={() => setIsOpen(!isOpen)}>Close</button>
      </Modal>
    </Layout>
  )
}

export default RecipeView;