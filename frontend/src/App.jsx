import { useState, useEffect } from "react";
import WeirdFridgeItem from "./components/WeirdFridgeItem";

export default function App() {
  useEffect(() => {
    document.title = "Weirdest Fridge Items";
  }, []);

  const [weirdItems, setWeirdItems] = useState([
    { name: "Toothpaste", description: "Why is there toothpaste in the fridge?!", imageUrl: "https://placehold.co/100" },
    { name: "Coconut", description: "Some people like their coconuts chilled, I guess?", imageUrl: "https://placehold.co/100" },
    { name: "Remote Control", description: "You were looking for this in the living room, weren't you?", imageUrl: "https://placehold.co/100" },
    { name: "Old Socks", description: "Are you trying to keep them fresh or what?", imageUrl: "https://placehold.co/100" },
  ]);

  const [newItem, setNewItem] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = () => {
    if (newItem.trim() !== "") {
      setWeirdItems([...weirdItems, { name: newItem, description: "A newly added weird item!", imageUrl: "https://placehold.co/100" }]);
      setNewItem("");
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
          <ul className="mt-3 list-disc text-left text-gray-800 space-y-2 pl-5">
            {weirdItems.map((item, index) => (
              <li 
                key={index} 
                className="cursor-pointer text-blue-600 hover:underline font-medium"
                onClick={() => setSelectedItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {selectedItem && <WeirdFridgeItem {...selectedItem} />}
      </div>
    </div>
  );
}
