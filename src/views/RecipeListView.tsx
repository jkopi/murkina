import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { HiChevronDown } from 'react-icons/hi';
import { BsFillGrid3X3GapFill, BsList } from 'react-icons/bs';
import Layout from '../components/Layout';
import { RecipeCard, RecipeListItem } from '../components/Recipe';
import { firestore } from '../config/firebase';
import { Recipe } from '../interfaces/Recipe';

const FoodListView = () => {
  const [viewType, setViewType] = useState<'list' | 'grid'>('grid');
  const [recipes, recipesLoading, recipesError] = useCollectionData<Recipe>(firestore.collection('recipes'), {
    idField: 'id',
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <Layout>
      {recipesLoading && (
        <Box>
          <Spinner size="lg" />
        </Box>
      )}
      <Flex direction="row" justifyContent="end" id="asdasd" my="2">
        <Menu>
          <MenuButton
            aria-label="view-type-button"
            as={Button}
            rightIcon={<HiChevronDown />}
            variant="outline"
            rounded="md"
          >
            <Icon as={viewType === 'grid' ? BsFillGrid3X3GapFill : BsList} fontSize="2xl" />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Display style">
              <MenuItem icon={<BsFillGrid3X3GapFill />} onClick={() => setViewType('grid')}>
                Grid
              </MenuItem>
              <MenuItem icon={<BsList />} onClick={() => setViewType('list')}>
                List
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
      {viewType === 'grid' && (
        <SimpleGrid columns={[1, 2, 3]} gap={8}>
          {recipes?.length !== 0 && recipes?.map((recipe: Recipe) => <RecipeCard recipe={recipe} />)}
        </SimpleGrid>
      )}
      {viewType === 'list' &&
        recipes?.length !== 0 &&
        recipes?.map((recipe: Recipe) => <RecipeListItem recipe={recipe} />)}

      {recipesError && <strong>Error: {JSON.stringify(recipesError)}</strong>}
    </Layout>
  );
};

export default FoodListView;
