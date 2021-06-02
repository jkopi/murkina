import cuid from 'cuid';
import { Form, Field, FieldArray, FieldArrayRenderProps, Formik, FormikHelpers } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { firestore, timestamp } from '../../config/firebase';
import { Recipe } from '../../interfaces/Recipe'
import { Button } from '../Button';
import { Input } from '../Input';
import RecipeSchema from './Schema';

interface Props {
  isCreating?: boolean;
  recipe?: Recipe;
  children?: React.ReactNode;
}

const FormInput = styled(Field)`
  padding: .5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: .5rem;
`;

const IngredientContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const RecipeForm: React.FC<Props> = ({ isCreating, recipe, children }) => {
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
        resetForm();
        console.log(JSON.stringify(values));
      }}
    >
      {({ values }) => (
        <Form>
          <label htmlFor="name">
            <h3>Recipe name</h3>
          </label>
          <Input
            name="name"
            type="text"
            placeholder="Recipe name"
          />

          <label htmlFor="description">
            <h3>Description</h3>
          </label>
          <Input
            name="description"
            type="text"
            placeholder="Description"
          />

          <label htmlFor="ingredients">
            <h3>Ingredients</h3>
          </label>
          <FieldArray
            name="ingredients"
            render={(helpers: FieldArrayRenderProps) => (
              <div>
                {values.ingredients?.map((_, index) => (
                  <IngredientContainer key={index}>
                    <FormInput placeholder="Amount" name={`ingredients[${index}].amount`} />
                    <FormInput placeholder="Name" name={`ingredients[${index}].name`} />
                    <Button onClick={() => helpers.remove(index)}>remove</Button>
                  </IngredientContainer>
                ))}
                <Button onClick={() => helpers.push({ amount: '', name: '' })}>Add new</Button>
              </div>
            )}
          />
          <hr />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}