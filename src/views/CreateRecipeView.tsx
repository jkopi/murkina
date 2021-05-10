import { Field, FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import cuid from 'cuid';
import Header from '../components/Header'
import { Recipe } from '../interfaces/Recipe'
import { timestamp, firestore } from '../config/firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const FormInput = styled(Field)`
  padding: .5rem;
  font-size: 16px;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: .5rem;
`;

const IngredientContainer = styled.div`
  margin: 1rem;
`;

const CreateRecipeView: React.FC = () => {
  const currentTime = timestamp.fromDate(new Date());
  const history = useHistory();

  return (
    <>
      <Header />
      <Link to="/">back</Link>
      <Formik
        initialValues={{
          id: cuid(),
          name: '',
          description: '',
          ingredients: [{ amount: '', name: '' }],
          createdAt: currentTime
        }}
        onSubmit={(
          values: Recipe,
          { setSubmitting, resetForm, setStatus }: FormikHelpers<Recipe>
        ) => {
          firestore
            .collection("recipes")
            .add(values)
            .then(() => {
              setTimeout(() => {
                history.push("/")
              }, 500)
            })
            .catch((error: Error) => {
              setStatus(error)
            })
          console.log(JSON.stringify(values));
          setSubmitting(false);
          resetForm();
        }}
        render={({ values }) => (
          <Form>
            <label htmlFor="name">
              <h3>Recipe name</h3>
            </label>
            <FormInput
              id="name"
              name="name"
              placeholder="Name"
            />

            <label htmlFor="description">
              <h3>Description</h3>
            </label>
            <FormInput
              id="description"
              name="description"
              placeholder="Description"
            />

            <label htmlFor="ingredients">
              <h3>Ingredients</h3>
            </label>
            <FieldArray
              name="ingredients"
              render={(helpers: FieldArrayRenderProps) => (
                <div>
                  {values.ingredients?.map((_, index: number) => (
                    <IngredientContainer key={index}>
                      <FormInput name={`ingredients[${index}].amount`} />
                      <FormInput name={`ingredients[${index}].name`} />
                      <Button onClick={() => helpers.remove(index)}>remove</Button>
                    </IngredientContainer>
                  ))}
                  <button type="button" onClick={() => helpers.push({ amount: '', name: '' })}>Add new</button>
                </div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      />
    </>
  )
}

export default CreateRecipeView