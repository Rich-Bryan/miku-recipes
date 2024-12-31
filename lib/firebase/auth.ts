import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError


export async function signUp(email: string, password: string) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error instanceof FirebaseError){
            throw new Error(error.message); 
        }
    }
  }
  
  export async function signIn (email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        if (error instanceof FirebaseError){
            throw new Error(error.message); 
        }
    }
  }