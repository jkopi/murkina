import * as Yup from 'yup';

const RecipeSchema = Yup.object().shape({
  name: Yup.string()
    .min(0, "Please enter a recipe name!")
    .max(50, "Recipe name is too long!")
    .required("Recipe name is required!"),
  description: Yup.string()
    .min(0, "Please enter a description!")
    .max(150, "Description is too long!")
    .required("Recipe description is required!")
});

export default RecipeSchema;