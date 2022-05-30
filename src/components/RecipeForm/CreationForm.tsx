import { FormControl, FormLabel, Button, Divider, Box, Flex } from '@chakra-ui/react';
import cuid from 'cuid';
import { Field, FieldArray, FieldArrayRenderProps, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { firestore, storage, timestamp } from '../../config/firebase';
import { Recipe } from '../../interfaces/Recipe';
import { FormComponent } from './FormComponent';
import { Input } from './Input';
import RecipeSchema from './Schema';

const FormInput = styled(Field)`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: 0.5rem;
`;

export const CreationForm = () => {
  const [imageName, setImageName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const currentTime = timestamp.fromDate(new Date());
  const history = useHistory();

  // image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      // get file & filename and set to state because we want to handle them in another function
      setImageFile(file);
      setImageName(file.name);
    }
    console.log(`current image in input: ${imageName}`);
  };

  const createRecipe = async (values: Recipe) => {
    // if image & imagename exists in state, send image to firebase storage
    if (imageFile && imageName) {
      // put image to 'recipe-images' directory
      await storage.child(`recipe-images/${imageName}`).put(imageFile);
    }

    firestore
      .collection('recipes')
      .add(values)
      .then(() => {
        toast.success(`Created ${values.name}`);
        setTimeout(() => {
          history.push(`/recipe/${values.id}`);
        }, 500);
      })
      .catch((error: Error) => {
        toast.error(`${error.message}`);
      });
  };

  const initialValues: Recipe = {
    name: '',
    description: '',
    ingredients: [{ amount: '', name: '' }],
    createdAt: currentTime
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RecipeSchema}
      onSubmit={(values: Recipe, { setSubmitting, resetForm }: FormikHelpers<Recipe>) => {
        const formData = {
          id: cuid(),
          name: values.name,
          description: values.description,
          imageReference: imageName,
          ingredients: values.ingredients,
          createdAt: currentTime,
        } as Recipe
        createRecipe(formData);
        setSubmitting(false);
        console.log(JSON.stringify(formData));
      }}
    >
      {({ values }) => (
        <FormComponent>
          <FormControl id="name">
            <FormLabel htmlFor="name">Recipe name</FormLabel>
            <Input id="name" name="name" type="text" placeholder="Recipe name" />
          </FormControl>

          <FormControl id="description">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input id="description" name="description" type="text" placeholder="Description" />
          </FormControl>

          <FormControl id="image" mt="5" mb="10">
            <FormLabel htmlFor="image">Recipe image</FormLabel>
            <input type="file" id="image" accept="image/*" onChange={handleImageUpload} />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
            <FieldArray
              name="ingredients"
              render={(helpers: FieldArrayRenderProps) => (
                <Box mb="2">
                  <Box mb="2">
                    {values.ingredients?.map((_, i) => (
                      <Flex alignItems="center" key={i}>
                        <FormInput placeholder="Amount" name={`ingredients[${i}].amount`} />
                        <FormInput placeholder="Unit" name={`ingredients[${i}].unit`} />
                        <FormInput placeholder="Ingredient" name={`ingredients[${i}].name`} />
                        <Button colorScheme="red" onClick={() => helpers.remove(i)}>
                          remove
                        </Button>
                      </Flex>
                    ))}
                  </Box>
                  <Button colorScheme="orange" onClick={() => helpers.push({ amount: '', unit: '', name: '' })}>
                    Add new
                  </Button>
                </Box>
              )}
            />
          </FormControl>

          <Divider />
          <Box mt="5">
            <Button type="submit" colorScheme="orange">
              Submit
            </Button>
          </Box>
        </FormComponent>
      )}
    </Formik>
  );
};
