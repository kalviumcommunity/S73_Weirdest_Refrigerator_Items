import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddItemForm({ fetchWeirdItems }) {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
    created_by: "", // New field
  });

  const [users, setUsers] = useState([]);

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Submit item to backend
  const addItem = async (e) => {
    e.preventDefault();

    const { name, description, imageUrl, created_by } = newItem;

    if (!name.trim() || !description.trim() || !imageUrl.trim() || !created_by.trim()) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        toast.success("Item added successfully!");
        setNewItem({ name: "", description: "", imageUrl: "", created_by: "" });
        fetchWeirdItems(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add item.");
      }
    } catch (error) {
      toast.error("Error adding item.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Add a New Weird Item</h2>

      <form onSubmit={addItem} className="w-full flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Enter item name..."
          value={newItem.name}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Enter description..."
          value={newItem.description}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Enter image URL..."
          value={newItem.imageUrl}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
          required
        />

        <select
          name="created_by"
          value={newItem.created_by}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md font-bold shadow-md hover:bg-green-700 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
