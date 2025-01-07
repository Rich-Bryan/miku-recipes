

import { User } from 'firebase/auth';
import { addDoc, collection, Firestore, getDocs, orderBy, query } from 'firebase/firestore';
import React from 'react'
import { firestore,  } from '.';

export declare type Props = {
    title: string;
    description: string;
    ingredients:string;
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
  interface Items {
    id: string;
    title: string;
    tag: string;
    description: string;
    ingredients: string;
    user_id: string;
    email: string;
  }

export async function getRecipe(){
  try {
    // Query Firestore collection "Item" and order by createdAt in descending order
    const q = query(collection(firestore, "recipes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const data: Items[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Items)
    );

    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
} 

// add edit func

// add del func