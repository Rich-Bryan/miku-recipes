"use client";
import { Props } from "@/lib/firebase/db";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Card = ({ recipe }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="file-card p-4 border rounded-md w-64 text-center">
      <div className="flex flex-col items-center">
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
    </div>
  );
};

export default Card;
