import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
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
    firestore.collection("recipes"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(recipes)
  return (
    <Layout>
      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
      {recipesLoading && <Spinner />}

      <FoodList>
        {recipes?.map((rcp: Recipe) => (
          <ListItem>
            <RecipeItem recipe={rcp} />
          </ListItem>
        ))}
      </FoodList>
      <code>{recipes && <span>Document: {JSON.stringify(recipes)}</span>}</code>
    </Layout>
  )
}

export default FoodListView;