"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getRecipe } from "@/lib/firebase/db";
import Card from "@/components/Card";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [recipes, setRecipes] = useState<any[]>([]); // State to store recipes
  const [loading, setLoading] = useState(true); // Loading state

  // Check for authentication and fetch recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // Redirect to sign-up if not authenticated
          router.push("/sign-up");
        } else {
          // Fetch recipes only if user is authenticated
          const fetchedRecipes = await getRecipe();
          setRecipes(fetchedRecipes);
          setLoading(false); // Set loading to false when data is fetched
        }
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    };

    fetchRecipes();
  }, [router, auth]);

  // Show loading state while waiting for recipes
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <h1 className='h1 capitalize'>Dashborad</h1>
      <section className="flex justify-between w-full">
      {recipes.length > 0 ? (
        <section className='flex flex-wrap gap-4 pt-4'>
          {recipes.map((recipe: Props) => (
            <Card key={recipe.id} recipe={recipe}/>
          ))}
        </section>
      ) : (
        <p>No recipes found.</p>
      )}
      </section>
    </div>
  );
}
