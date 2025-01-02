import { auth } from "@/lib/firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError

// for existing user
export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
  }
}
// for new user
export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw new Error(error.message);
    }
  }
}
