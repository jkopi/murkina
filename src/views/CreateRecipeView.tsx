import { Field, FieldArray, FieldArrayRenderProps, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import cuid from 'cuid';
import { Recipe } from '../interfaces/Recipe'
import { timestamp, firestore } from '../config/firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import Layout from '../components/Layout';

const FormInput = styled(Field)`
  padding: .5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: .5rem;
`;

// const TextArea = styled.textarea`
//   min-width: 200px;
//   min-height: 50px;
// `;

const IngredientContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const CreateRecipeView: React.FC = () => {
  const currentTime = timestamp.fromDate(new Date());
  const history = useHistory();

  return (
    <Layout>
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
      >
        {({ values }) => (
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
                  {values.ingredients?.map((_, index) => (
                    <IngredientContainer>
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
    </Layout>
  )
}

export default CreateRecipeView