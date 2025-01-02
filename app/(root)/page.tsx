"use client"
import { useEffect} from "react";
import { useRouter } from "next/navigation";

import { getAuth, onAuthStateChanged } from "firebase/auth"; 

export default function Home() {
  const router = useRouter();
  const auth = getAuth()

  useEffect(() => {
    // Check authentication status when the component is mounted
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to sign-up if the user is not authenticated
        router.push("/sign-up");
      } else {
        // Optional: Redirect to another page if the user is authenticated
        // e.g., router.push("/dashboard");
        router.push("/");
      }
      
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [router, auth]);


  return (
    <div className="flex-center h-screen">
      <h1 className="h1">Miku - will save all your recipes</h1>
    </div>
  )
}