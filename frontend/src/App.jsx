import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeirdFridgeItem from "./components/WeirdFridgeItem";
import UpdateEntityForm from "./components/UpdateEntityForm";
import AddItemForm from "./components/AddItemForm"; // 🔥 Importing AddItemForm

export default function App() {
  useEffect(() => {
    document.title = "Weirdest Fridge Items";
    fetchWeirdItems();
  }, []);

  const [weirdItems, setWeirdItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data from backend
  const fetchWeirdItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/entities");
      const data = await response.json();
      setWeirdItems(data);
      console.log("Fetched entities:", data);
    } catch (error) {
      console.error("Error fetching weird fridge items:", error);
      toast.error("Failed to fetch fridge items.");
    }
  };

  // Delete an entity
  const deleteEntity = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/entities/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Entity deleted successfully!");
        fetchWeirdItems(); // Refresh the list
        console.log(`Entity with ID ${id} deleted.`);
      } else {
        toast.error("Failed to delete entity.");
        console.error("Failed to delete entity");
      }
    } catch (error) {
      toast.error("Error deleting entity.");
      console.error("Error deleting entity:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <ToastContainer /> {/* Toast Notification Container */}

      <h1 className="text-4xl font-bold">Weirdest Fridge Items</h1>

      {/* 🔥 AddItemForm is inserted here */}
      <div className="mt-6">
        <h2 className="text-2xl mb-2">Add a Weird Item</h2>
        <AddItemForm fetchWeirdItems={fetchWeirdItems} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl">Items List</h2>
        <ul className="mt-3">
          {weirdItems.map((item) => (
            <li key={item._id} className="mt-2">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {item.name}
              </span>
              <button
                onClick={() => deleteEntity(item._id)}
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedItem && (
        <UpdateEntityForm entity={selectedItem} onUpdate={fetchWeirdItems} />
      )}
    </div>
  );
}
