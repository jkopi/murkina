import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/Layout';
import RecipeItem from '../components/RecipeItem';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const FoodList = styled.ul``;

const ListItem = styled.li``;

const FoodListView: React.FC = () => {
  const [
    recipes, recipesLoading, recipesError
  ] = useCollectionData<Recipe>(
    firestore
      .collection("recipes"),
    {
      idField: "id",
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <Layout>
      <Link to="/recipe/create">Create new</Link>
      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
      {recipesLoading && <Spinner />}
      {recipes && (
        <FoodList>
          {recipes.map((rcp: Recipe) => (
            <ListItem key={rcp.id}>
              <RecipeItem recipe={rcp} />
            </ListItem>
          ))}
        </FoodList>
      )}
      <code>{recipes && <span>Document: {JSON.stringify(recipes)}</span>}</code>
    </Layout>
  )
}

export default FoodListView;