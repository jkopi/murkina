import { Field, Formik, FormikHelpers } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { firestore, timestamp } from '../../config/firebase'
import { Recipe } from '../../interfaces/Recipe'
import { FormComponent } from './FormComponent'
import { Input } from './Input'
import RecipeSchema from './Schema'

interface Props {
  id: string;
  data: Recipe | any;
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

export const EditForm: React.FC<Props> = ({ id, data }) => {
  const editTime = timestamp.fromDate(new Date());

  const editRecipe = (values: Recipe) => {
    console.log(values);
    firestore
      .collection("recipes")
      .doc(id)
      .update({
        ...values,
        updatedAt: editTime
      }).then(() => {
        toast.success(`Edited ${values.name}`)
      }).catch((error: Error) => {
        toast.error(`${error}`)
      })
  }

  return (
    <Formik
      initialValues={data}
      validationSchema={RecipeSchema}
      onSubmit={(
        values: Recipe,
        { setSubmitting }: FormikHelpers<Recipe>
      ) => {
        editRecipe(values);
        setSubmitting(false);
      }}>
      {({ values }) => (
        <FormComponent>
          <Input name="name" type="text" placeholder={data.name}/>
          <Input name="description" type="text" placeholder={data.description}/>
          {values.ingredients?.map((_, i) => (
            <IngredientContainer key={i}>
              <FormInput placeholder="Amount" name={`ingredients[${i}].amount`}/>
              <FormInput placeholder="Name" name={`ingredients[${i}].name`}/>
            </IngredientContainer>
          ))}
          <button disabled={(JSON.stringify(data) === JSON.stringify(values)) ? true : false}>Submit</button>
        </FormComponent>
      )}
    </Formik>
  )
}