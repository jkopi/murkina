export interface Recipe {
  name: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

// firebase.default.firestore.Timestamp