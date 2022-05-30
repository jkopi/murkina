import { Box, Link, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Layout from '../components/Layout';
import RecipeItem from '../components/Recipe/RecipeItem';
import { firestore, storage } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const FoodListView = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [recipes, recipesLoading, recipesError] = useCollectionData<Recipe>(firestore.collection('recipes'), {
    idField: 'id',
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.child('recipe-images').listAll();
      let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImageUrls(urls);
    };
    loadImages();
  }, []);
  console.log(imageUrls)


  return (
    <Layout>
      {recipesLoading && (
        <Box>
          <Spinner size="lg" />
        </Box>
      )}
      {recipes && (
        <List>
          {recipes.map((rcp: Recipe) => (
            <ListItem key={rcp.id}>
              <RecipeItem recipe={rcp} />
            </ListItem>
          ))}
        </List>
      )}
      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
    </Layout>
  );
};

export default FoodListView;
