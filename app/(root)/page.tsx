"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getRecipe,  Items } from "@/lib/firebase/db";
import Card from "@/components/Card";

export default function Home() {
  const router = useRouter();
  const auth = getAuth();
  const [recipes, setRecipes] = useState<Items[]>([]); // State to store recipes
  const [loading, setLoading] = useState(true); // Loading state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for authentication and fetch recipes on component mount
  useEffect(() => {
    const fetchRecipes = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // Redirect to sign-up if not authenticated
          router.push("/sign-up");
        } else {
          // Fetch recipes only if user is authenticated
          setCurrentUser(user);
          try {
            const fetchedRecipes = (await getRecipe()) || [];
            setRecipes(fetchedRecipes);
          } catch (error) {
            console.error("Failed to fetch recipes:", error);
          } finally {
            setLoading(false); // Set loading to false when data is fetched
          }
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
      <h1 className='h1 capitalize'>Dashboard</h1>
      <section className="flex justify-between w-full">
        {recipes.length > 0 ? (
          <section className='flex flex-wrap gap-4 pt-4'>
            {recipes.map((recipe: Items) => (
              <Card key={recipe.id} recipe={recipe} currentUserId={currentUser?.uid || ""} />
            ))}
          </section>
        ) : (
          <p>No recipes found.</p>
        )}
      </section>
    </div>
  );
}
