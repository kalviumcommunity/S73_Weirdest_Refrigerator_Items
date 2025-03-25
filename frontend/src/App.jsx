import { useState, useEffect } from "react";
import WeirdFridgeItem from "./components/WeirdFridgeItem";

export default function App() {
  useEffect(() => {
    document.title = "Weirdest Fridge Items";
    fetchWeirdItems();
  }, []);

  const [weirdItems, setWeirdItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from backend
  const fetchWeirdItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/entities");
      const data = await response.json();

      if (Array.isArray(data)) {
        setWeirdItems(data);
      } else {
        console.error("API response is not an array:", data);
        setWeirdItems([]);
      }
    } catch (error) {
      console.error("Error fetching weird fridge items:", error);
      setWeirdItems([]);
    }
  };

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
          headers: {
            "Content-Type": "application/json",
          },
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
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center flex-col px-5 text-center w-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-700 shadow-lg">
          List of the Weirdest Refrigerator Items People Keep
        </h1>
        <p className="text-lg text-gray-600 italic mt-2 mb-6">
          Discover the weirdest things people keep in their fridge! 😱
        </p>

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

        <div className="bg-purple-100 p-6 rounded-lg w-full max-w-sm text-center mt-6 shadow-lg border border-purple-500">
          <h2 className="text-2xl font-bold text-purple-700">Top Weirdest Items</h2>
          {weirdItems.length > 0 ? (
            <ul className="mt-3 list-disc text-left text-gray-800 space-y-2 pl-5">
              {weirdItems.map((item) => (
                <li
                  key={item?._id}
                  className="cursor-pointer text-blue-600 hover:underline font-medium"
                  onClick={() => setSelectedItem(item)}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-3">No weird items found.</p>
          )}
        </div>

        {selectedItem && <WeirdFridgeItem {...selectedItem} />}
      </div>
    </div>
  );
}
