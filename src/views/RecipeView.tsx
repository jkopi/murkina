import React from 'react'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const RecipeView: React.FC = () => {
  let id = useParams();

  const [
    recipe,
    recipeLoading,
    recipeError
  ] = useDocumentDataOnce<Recipe>(
    firestore.doc(`recipes/${id}`),
    {
      idField: "id"
    }
  );

  return (
    <div>
      {recipeLoading && <Spinner />}
      {recipeError && <p>Error!</p>}
      <Link to="/">back</Link>
      <p>{JSON.stringify(recipe?.name)}</p>
      <p>Yes! it works.</p>
      <h1>{JSON.stringify(id)}</h1>
    </div>
  )
}

export default RecipeView;