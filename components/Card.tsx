"use client";
import { delRecipe, editRecipe } from "@/lib/firebase/db";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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

const Card = ({ recipe, currentUserId }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="file-card p-4 border rounded-md w-64 text-center">
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
        <span className="body-1 hidden sm:block text-light-200">
          {recipe.tag}
        </span>
        <p className="py-4 text-gray-600 text-sm leading-relaxed">description...</p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Manage Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Title: {recipe.title}</h2>
            <h3 className="text-lg font-semibold">Description</h3>
            <div className="overflow-y-auto max-h-48">
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {recipe.description}
              </p>
            </div>
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <div className="overflow-y-auto max-h-48">
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {recipe.ingredients}
              </p>
            </div>
            <p className="text-sm text-gray-500">Tag: {recipe.tag}</p>

            <div className="flex justify-end space-x-4">
              {recipe.user_id == currentUserId && (
                <Button
                  onClick={async () => {
                    await delRecipe(recipe.id);
                    setIsModalOpen(false);
                    alert(`Deleting: ${recipe.title}`);
                    location.reload();
                  }}
                  className="modal-submit-button w-full"
                >
                  Delete
                </Button>
              )}

              {recipe.user_id == currentUserId && (
              <Button
                onClick={() => setEditModalOpen(true)}
                className="modal-submit-button w-full"
              >
                Edit
              </Button>)}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="w-[60vw] h-[80vh] max-w-full max-h-screen p-6 flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="input w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full h-[200px] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Ingredients</label>
              <textarea
                value={editData.ingredients}
                onChange={(e) =>
                  setEditData({ ...editData, ingredients: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full h-[200px] resize-none"
              />
            </div>
            <p className="text-sm text-gray-500">Tag: {recipe.tag}</p>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={async () => {
                  await editRecipe(recipe.id, editData);
                  setEditModalOpen(false);
                
                  
                }}
                className="modal-submit-button w-full"
              >
                Save
              </Button>
              <Button onClick={() => setEditModalOpen(false)} className="modal-cancel-button">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Card;
