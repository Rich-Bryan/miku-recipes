import { Props } from '@/lib/firebase/db'
import Image from 'next/image'
import React from 'react'

  

const Card = ({recipe}:Props) => {
  return (
    <div className="file-card p-4 border rounded-md w-64 text-center">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/images/vecteezy_dessert-recipes-filled-line-icon_8627248.jpg"
          alt="picture"
          width={55}
          height={55}
        />
         <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
        <span className="px-3 py-1 text-sm text-black bg-blue-500 rounded-full mb-3">
          {recipe.tag}
        </span>
        <p className="text-gray-600 text-sm leading-relaxed">{recipe.description}</p>
      </div>
    </div>
  )
}


export default Card