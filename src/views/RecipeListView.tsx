import { Box, List, ListItem, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Layout from '../components/Layout';
import RecipeItem from '../components/RecipeItem';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

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
      {recipesLoading && (
        <Box>
          <Spinner size="lg" />
        </Box>
      )}
      {recipes && (
        <>
          <List>
            {recipes.map((rcp: Recipe) => (
              <ListItem key={rcp.id}>
                <RecipeItem recipe={rcp} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
    </Layout>
  )
}

export default FoodListView;