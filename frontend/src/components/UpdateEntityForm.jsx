import { useState } from "react";
import { toast } from "react-toastify";


export default function UpdateEntityForm({ entity, onUpdate }) {
  const [updatedName, setUpdatedName] = useState(entity.name);
  const [updatedDescription, setUpdatedDescription] = useState(entity.description);

  const handleUpdate = async () => {
    const updatedData = { name: updatedName, description: updatedDescription };

    try {
      const response = await fetch(`http://localhost:3000/api/entities/${entity._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success("Entity updated successfully!");
        onUpdate(); // Refresh list
        console.log(`Entity with ID ${entity._id} updated.`);
      } else {
        toast.error("Failed to update entity.");
        console.error("Failed to update entity");
      }
    } catch (error) {
      toast.error("Error updating entity.");
      console.error("Error updating entity:", error);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md mt-4">
      <h2 className="text-lg font-semibold">Update Entity</h2>
      <input
        type="text"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
        className="p-2 border w-full rounded mt-2"
        placeholder="Updated Name"
      />
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        className="p-2 border w-full rounded mt-2"
        placeholder="Updated Description"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Update
      </button>
    </div>
  );
}
