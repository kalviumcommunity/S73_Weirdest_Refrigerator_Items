import { useState } from "react";

export default function AddItemForm({ fetchWeirdItems }) {
  const [newItem, setNewItem] = useState("");

  const addItem = async () => {
    if (newItem.trim() !== "") {
      const newItemObj = {
        name: newItem,
        description: "A newly added weird item!",
        imageUrl: "https://placehold.co/100",
      };

      try {
        const response = await fetch("http://localhost:3000/api/entities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItemObj),
        });

        if (response.ok) {
          fetchWeirdItems();
          setNewItem("");
        } else {
          console.error("Failed to add item");
        }
      } catch (error) {
        console.error("Error adding weird fridge item:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-sm">
      <input
        type="text"
        placeholder="Enter a weird item..."
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-lg w-full shadow-md focus:ring-2 focus:ring-purple-500"
      />
      <button
        onClick={addItem}
        className="bg-purple-600 text-white px-4 py-2 rounded-md font-bold shadow-lg hover:bg-purple-700 transition"
      >
        Submit
      </button>
    </div>
  );
}
