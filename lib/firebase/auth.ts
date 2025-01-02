import { auth } from "@/lib/firebase";
import {onAuthStateChanged, User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "firebase/app"; // Import FirebaseError
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

// Custom hook for handling authentication
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is not logged in
        router.push('/sign-up'); // Redirect to sign-up if user is not logged in
      }
      setIsLoading(false); // Stop loading once authentication is done
    });

    return () => unsubscribe();
  }, [router]);

  return { isLoading, user };
};
