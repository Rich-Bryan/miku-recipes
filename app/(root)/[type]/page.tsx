
import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getRecipe, Items } from '@/lib/firebase/db';
import React from 'react';


const Page = async ({ params }: { params: Promise<{ type?: string }>}) => {
  const type = ((await params))?.type || ""; // Access params and handle the type key safely
  let recipes: Items[] | undefined;
  try {
    recipes = await getRecipe();
  } catch (error) {
    // Handle error or provide a fallback, if necessary
    console.error("Failed to fetch recipes:", error);
    recipes = [];
  }
  // Filter recipes where the tag is "Dessert"
  const dessertRecipes = recipes ? recipes.filter((recipe) => recipe.tag === "Dessert"): [];

  return (
    <div>
      <section className='flex justify-between w-full'>
        <h1 className='h1 capitalize'>{type}</h1>
        <div className='sort-container'>
          <p className='body-1 hidden sm:block text-light-200'>Sort by:</p>
          <Sort></Sort>
        </div>
      </section>
      {dessertRecipes.length > 0 ? (
        <section className='flex flex-wrap gap-4 pt-4'>
          {dessertRecipes.map((recipe: Items) => (
            <Card key={recipe.id} recipe={recipe} currentUserId={recipe.user_id} />
          ))}
        </section>
      ) : (
        <p>No recipes found.</p>
      )}
      
    </div>
  );
};

export default Page;
