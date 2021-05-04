import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const RecipeView: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const [
    recipe,
    recipeLoading,
    recipeError
  ] = useDocumentDataOnce<Recipe>(
    firestore
      .collection("recipes")
      .doc(recipeId)
  );

  return (
    <>
      <Header />
      <div>
        <Link to="/">back</Link>
        {recipeLoading && <Spinner />}
        {recipe && (
          <>
            <p>{recipe.name}</p>
            <p>Yes! it works.</p>
            <p>{recipeId}</p>
            <p>{recipe?.description}</p>
            <p>{recipe.createdAt.toDate().toLocaleDateString()}</p>
          </>
        )}
        {recipeError}
      </div>
    </>
  )
}

export default RecipeView;