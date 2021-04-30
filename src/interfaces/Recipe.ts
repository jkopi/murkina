export interface Recipe {
  id: string;
  name: string;
  description: string;
  createdAt: firebase.default.firestore.Timestamp;
  updatedAt?: string;
}