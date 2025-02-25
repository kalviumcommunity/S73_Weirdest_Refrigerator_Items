import React from "react";

export default function WeirdFridgeItem({ name, description, imageUrl }) {
  return (
    <div className="border border-purple-500 p-4 rounded-lg bg-purple-100 w-full max-w-md text-center shadow-lg mt-4">
      <img src={imageUrl} alt={name} className="w-24 h-24 rounded-lg mx-auto" />
      <h2 className="text-xl font-bold text-purple-700 mt-2">{name}</h2>
      <p className="text-gray-700 text-sm mt-1">{description}</p>
    </div>
  );
}
