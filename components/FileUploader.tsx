import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { CreateRecipe } from "@/lib/firebase/db";
import { v4 as uuidv4 } from "uuid";



const FileUploader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("Dessert");
  const [email, setEmail] = useState<string | null>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || "User"); // Use "User" as a fallback if displayName is not set
        setCurrentUser(user);
      }
    });

    return () => unsubscribe();
  }, []);


  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };
  const closeModals = () => {
    setIsDialogOpen(false);
  };
  const handleAction = async () => {
    try {
      const recipeId = await CreateRecipe({
        title,
        description,
        ingredients,
        tag: selectedTag,
        user_id: currentUser.uid,
        email: email || "",
      });
      console.log(`Recipe created successfully with ID: ${recipeId}`);
      setDescription("");
      setTitle("");
      setIngredients("")
      location.reload();
 
      closeModals(); // Close the dialog on successful submission
    } catch (error: unknown) {
      console.error("Failed to create recipe:", error.message);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="uploader-button w-full"
        onClick={handleDialogToggle}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p className="md:hidden lg:block">Upload Recipe</p>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[60vw] h-[80vh] max-w-full max-h-screen p-6 flex flex-col">
          <DialogHeader>
            <DialogTitle>Upload</DialogTitle>

            <DialogDescription className="mt-4">Title</DialogDescription>
            <Input
              className="mt-1 p-2 border rounded-md"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DialogDescription>description</DialogDescription>
            {/* <Input className="mt-1 p-2 border rounded-md" type='text' value={description} onChange={(e) => setDescription(e.target.value)}/> */}
            <textarea
              className="mt-1 p-2 border rounded-md w-full h-[200px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description here"
            />
            <DialogDescription>Ingredients</DialogDescription>
            <textarea
              className="mt-1 p-2 border rounded-md w-full h-[200px] resize-none"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Enter a detailed Ingredients here"
            />
          </DialogHeader>

          <div className="flex flex-row ">
            <Button
              onClick={closeModals}
              className="modal-cancel-button w-full"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              className="modal-submit-button w-full"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileUploader;
