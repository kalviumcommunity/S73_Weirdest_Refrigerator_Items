import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import AddUserForm from "./components/AddUserForm";
import AddItemForm from "./components/AddItemForm";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [weirdItems, setWeirdItems] = useState([]);

  const fetchWeirdItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/entities");
      const data = await response.json();
      setWeirdItems(data);
    } catch (error) {
      toast.error("Failed to fetch items");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeirdItems();
  }, []);

  return (
    <Router>
      <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-black">Weirdest Refrigerator Items 🧊</h1>

        <Routes>
          {/* Homepage showing item list and buttons */}
          <Route
            path="/"
            element={
              <div className="w-full max-w-3xl">
                <div className="flex justify-end gap-3 mb-4">
                  <Link
                    to="/add-user"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 transition"
                  >
                    ➕ Add User
                  </Link>
                  <Link
                    to="/add-item"
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-green-700 transition"
                  >
                    ➕ Add Item
                  </Link>
                </div>

                <div className="grid gap-4">
                  {weirdItems.length > 0 ? (
                    weirdItems.map((item) => (
                      <div
                        key={item._id}
                        className="border rounded-lg p-4 shadow bg-white text-black"
                      >
                        <h2 className="text-xl font-bold text-black">{item.name}</h2>
                        <p className="text-black">{item.description}</p>
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-48 object-cover mt-2 rounded"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-black">No items found.</p>
                  )}
                </div>
              </div>
            }
          />

          {/* Add User Page */}
          <Route path="/add-user" element={<AddUserForm />} />

          {/* Add Item Page with callback to refetch items */}
          <Route path="/add-item" element={<AddItemForm fetchWeirdItems={fetchWeirdItems} />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}
