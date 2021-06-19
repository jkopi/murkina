import { FormControl, FormLabel, Button, Divider, Box, Flex } from '@chakra-ui/react';
import cuid from 'cuid';
import { Field, FieldArray, FieldArrayRenderProps, Formik, FormikHelpers } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { firestore, timestamp } from '../../config/firebase';
import { Recipe } from '../../interfaces/Recipe'
import { FormComponent } from './FormComponent';
import { Input } from './Input';
import RecipeSchema from './Schema';

const FormInput = styled(Field)`
  padding: .5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: .5rem;
`;

export const CreationForm: React.FC = () => {
  const currentTime = timestamp.fromDate(new Date());
  const history = useHistory();

  const createRecipe = (values: Recipe) => {
    firestore
      .collection("recipes")
      .add(values)
      .then(() => {
        toast.success(`Created ${values.name}`);
        setTimeout(() => {
          history.push("/");
        }, 500)
      })
      .catch((error: Error) => {
        toast.error(`${error.message}`)
      })
  }

  const initialValues = {
    id: cuid(),
    name: '',
    description: '',
    ingredients: [{ amount: '', name: '' }],
    createdAt: currentTime
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RecipeSchema}
      onSubmit={(
        values: Recipe,
        { setSubmitting, resetForm }: FormikHelpers<Recipe>
      ) => {
        createRecipe(values);
        setSubmitting(false);
        console.log(JSON.stringify(values));
      }}
    >
      {({ values }) => (
        <FormComponent>
          <FormControl id="name">
            <FormLabel htmlFor="name">Recipe name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Recipe name"
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              name="description"
              type="text"
              placeholder="Description"
            />
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
                        <FormInput placeholder="Name" name={`ingredients[${i}].name`} />
                        <Button colorScheme="red" onClick={() => helpers.remove(i)}>remove</Button>
                      </Flex>
                    ))}
                  </Box>
                  <Button colorScheme="orange" onClick={() => helpers.push({ amount: '', name: '' })}>Add new</Button>
                </Box>
              )}
            />
          </FormControl>
          <Divider />
          <Box mt="5">
            <Button type="submit" colorScheme="orange">Submit</Button>
          </Box>
        </FormComponent>
      )}
    </Formik>
  )
}