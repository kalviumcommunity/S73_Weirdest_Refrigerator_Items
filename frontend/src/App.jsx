import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WeirdFridgeItem from "./components/WeirdFridgeItem";
import UpdateEntityForm from "./components/UpdateEntityForm";
import AddItemPage from "./components/AddItemPage"; // New Page

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
        fetchWeirdItems();
      } else {
        toast.error("Failed to delete entity.");
      }
    } catch (error) {
      toast.error("Error deleting entity.");
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <ToastContainer /> {/* Toast Notification Container */}
        <h1 className="text-4xl font-bold">Weirdest Fridge Items</h1>

        <nav className="mt-4">
          <Link to="/" className="text-blue-500 mr-4">Home</Link>
          <Link to="/add" className="text-green-500">Add Item</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
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
                {selectedItem && (
                  <UpdateEntityForm entity={selectedItem} onUpdate={fetchWeirdItems} />
                )}
              </div>
            }
          />
          <Route path="/add" element={<AddItemPage />} />
        </Routes>
      </div>
    </Router>
  );
}
