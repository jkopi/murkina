import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styled from 'styled-components';
import Layout from '../components/Layout';
import RecipeItem from '../components/RecipeItem';
import Spinner from '../components/Spinner';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

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
      {recipesLoading && <Spinner />}
      {recipes ? (
        <>
          <p><b>{recipes.length}</b> recipes so far</p>
          <List>
            {recipes.map((rcp: Recipe) => (
              <ListItem key={rcp.id}>
                <RecipeItem recipe={rcp} />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <p>No recipes found..</p>
        </>
      )}
      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
    </Layout>
  )
}

export default FoodListView;