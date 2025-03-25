import { useState, useEffect } from "react";
import WeirdFridgeItem from "./components/WeirdFridgeItem";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

export default function App() {
  useEffect(() => {
    document.title = "Weirdest Fridge Items";
    fetchWeirdItems();
  }, []);

  const [weirdItems, setWeirdItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center flex-col px-5 text-center w-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-purple-700 shadow-lg">
          List of the Weirdest Refrigerator Items People Keep
        </h1>
        <p className="text-lg text-gray-600 italic mt-2 mb-6">
          Discover the weirdest things people keep in their fridge! 😱
        </p>

        {/* Add Item Form */}
        <AddItemForm fetchWeirdItems={fetchWeirdItems} />

        {/* Item List */}
        <ItemList weirdItems={weirdItems} setSelectedItem={setSelectedItem} />

        {/* Selected Item Details */}
        {selectedItem && <WeirdFridgeItem {...selectedItem} />}
      </div>
    </div>
  );
}
