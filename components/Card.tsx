"use client";
import { delRecipe, Items, Props } from "@/lib/firebase/db";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
interface CardProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    ingredients: string;
    tag: string;
    user_id: string;
  };
  currentUserId: string;
}
const Card = ( {recipe,currentUserId}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="file-card p-4 border rounded-md w-64 text-center">
    {/* Card */}
      <div className="flex flex-col items-center" onClick={toggleModal}>
        <Image
          src="/assets/images/vecteezy_dessert-recipes-filled-line-icon_8627248.jpg"
          alt="picture"
          width={55}
          height={55}
        />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {recipe.title}
        </h2>

        <span className="body-1 hidden sm:block text-light-200 ">
          {recipe.tag}
        </span>

        <p className="py-4 text-gray-600 text-sm leading-relaxed">description...</p>
      </div>
      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Title: {recipe.title}</h2>
            <h3 className="text-lg font-semibold">Description</h3>
            <div className="overflow-y-auto max-h-48"> {/* Set max height and make it scrollable */}
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {recipe.description}
              </p>
            </div>
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <div className="overflow-y-auto max-h-48"> {/* Set max height and make it scrollable */}
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {recipe.ingredients}
                
              </p>
            </div>
            <p className="text-sm text-gray-500">Tag: {recipe.tag} {recipe.user_id} {currentUserId}</p>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              {recipe.user_id == currentUserId &&(
                <Button
                    onClick={async () => {
                        await delRecipe(recipe.id); // Pass the recipe ID to delRecipe function
                        setIsModalOpen(false);
                        alert(`Deleting: ${recipe.title}`);
                        location.reload();
                      }}
                    className="modal-submit-button w-full"
                >
                    Delete
                </Button>
              )}
                
    
              <Button
                onClick={() => {
                  // Add edit logic here
                  alert(`Editing: ${recipe.title}`);
                  setIsModalOpen(false);
                }}
                className="modal-submit-button w-full"
              >
                Edit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    
  );
};

export default Card;
