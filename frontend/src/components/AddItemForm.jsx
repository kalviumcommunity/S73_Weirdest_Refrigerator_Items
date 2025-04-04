import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddItemForm() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Please select a user!");
      return;
    }

    console.log("Sending to backend:", {
      name: itemName,
      description,
      created_by: userId,
    });

    try {
      const response = await fetch("http://localhost:3000/api/entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: itemName,
          description,
          created_by: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Item added!");
        setItemName("");
        setDescription("");
        setUserId("");

        navigate("/");
      } else {
        toast.error(data.error || "Error adding item.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("POST error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md bg-white rounded shadow text-black">
      <h2 className="text-2xl mb-4 font-bold">Add New Item</h2>

      {/* Dropdown for selecting user */}
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="p-2 border rounded-md w-full text-black"
        required
      >
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>

      {/* Item Name */}
      <input
        type="text"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="mb-4 p-2 border rounded w-full text-black"
        required
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 p-2 border rounded w-full text-black"
        required
      ></textarea>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold shadow-md hover:bg-blue-700 transition"
      >
        Add Item
      </button>
    </form>
  );
}
