export interface Ingredient {
  amount: string;
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients?: Ingredient[];
  createdAt: firebase.default.firestore.Timestamp;
  updatedAt?: string;
}