
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { firestore } from ".";

export declare type Props = {
  title: string;
  description: string;
  ingredients: string;
  tag: string;
  user_id: string;
  email: string;
};

export async function CreateRecipe({
  title,
  description,
  ingredients,
  tag,
  user_id,
  email,
}: Props) {
  try {
    // Save data to Firestore
    const docRef = await addDoc(collection(firestore, "recipes"), {
      title,
      description,
      ingredients,
      tag,
      user_id,
      createdAt: Date(),
      email,
    });
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}
export interface Items {
  id: string;
  title: string;
  tag: string;
  description: string;
  ingredients: string;
  user_id: string;
  email: string;
}

export async function getRecipe() {
  try {
    // Query Firestore collection "Item" and order by createdAt in descending order
    const q = query(
      collection(firestore, "recipes"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data: Items[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Items)
    );

    // Return the unsubscribe function to stop listening when necessary
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// add edit func
export async function editRecipe(recipeId: string, updatedData: Partial<{ title: string; description: string; ingredients: string }>) {
  try {
    // Display a confirmation dialog
    const confirmEdit = window.confirm("Are you sure you want to save these changes?");
    if (confirmEdit) {
      // Reference to the specific recipe document
      const recipeRef = doc(firestore, "recipes", recipeId);
      await updateDoc(recipeRef, updatedData);
      location.reload();

      console.log("Document successfully updated!");
    }
  } catch (error) {
    console.error("Error updating document:", error);
  }
}
// add del func
export async function delRecipe(recipeId: string) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (confirmDelete) {
    try {
      // Reference to the specific recipe document
      const recipeRef = doc(firestore, "recipes", recipeId);
      await deleteDoc(recipeRef);
      location.reload();
  
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  } else {
    console.log("Deletion canceled.");
  }
}
