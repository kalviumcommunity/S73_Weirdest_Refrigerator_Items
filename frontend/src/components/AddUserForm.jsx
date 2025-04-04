import { useState } from "react";
import { toast } from "react-toastify";

export default function AddUserForm() {
  const [username, setUsername] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Username cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Error: ${errorText}`);
        return;
      }

      const data = await response.json();
      toast.success("User added successfully!");
      setUsername("");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md p-6 border rounded-lg shadow-md bg-white text-black">
      <h2 className="text-2xl font-bold text-black">Add a New User</h2>

      <form onSubmit={handleAddUser} className="w-full flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-md w-full text-black placeholder-black"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold shadow-md hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
