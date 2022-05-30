export interface Ingredient {
  amount: string;
  unit?: string;
  name: string;
}

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  imageReference?: string;
  ingredients?: Ingredient[];
  createdAt: firebase.default.firestore.Timestamp;
  updatedAt?: string;
}