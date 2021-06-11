import cuid from 'cuid';
import { Field, FieldArray, FieldArrayRenderProps, Formik, FormikHelpers } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { firestore, timestamp } from '../../config/firebase';
import { Recipe } from '../../interfaces/Recipe'
import { Button } from '../Button';
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

const IngredientContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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
        // resetForm();
        console.log(JSON.stringify(values));
      }}
    >
      {({ values }) => (
        <FormComponent>
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
                {values.ingredients?.map((_, i) => (
                  <IngredientContainer key={i}>
                    <FormInput placeholder="Amount" name={`ingredients[${i}].amount`} />
                    <FormInput placeholder="Name" name={`ingredients[${i}].name`} />
                    <Button onClick={() => helpers.remove(i)}>remove</Button>
                  </IngredientContainer>
                ))}
                <Button onClick={() => helpers.push({ amount: '', name: '' })}>Add new</Button>
              </div>
            )}
          />
          <hr />
          <button type="submit">Submit</button>
        </FormComponent>
      )}
    </Formik>
  )
}