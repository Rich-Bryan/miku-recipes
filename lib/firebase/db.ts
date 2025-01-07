"use client";

import { User } from 'firebase/auth';
import { addDoc, collection, Firestore } from 'firebase/firestore';
import React from 'react'
import { firestore } from '.';

declare type Props = {
    title: string;
    description: string;
    tag: string;
    user_id: string; 
    email: string;
  };
  
  export async function CreateRecipe({
    title,
    description,
    tag,
    user_id,
    email,
  }: Props) {
    try {
      // Save data to Firestore
      const docRef = await addDoc(collection(firestore, "recipes"), {
        title,
        description,
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