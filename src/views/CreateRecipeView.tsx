import { Field, Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import styled from 'styled-components'
import cuid from 'cuid';
import Header from '../components/Header'
import { Recipe } from '../interfaces/Recipe'
import { timestamp, firestore } from '../config/firebase';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const FormInput = styled(Field)`
  padding: .5rem;
  font-size: 16px;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin: .5rem;
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
        }}>
        <Form>
          <label htmlFor="name">Recipe name</label>
          <FormInput
            id="name"
            name="name"
            placeholder="Name"
          />

          <label htmlFor="description">Description</label>
          <FormInput
            id="description"
            name="description"
            placeholder="Description"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  )
}

export default CreateRecipeView