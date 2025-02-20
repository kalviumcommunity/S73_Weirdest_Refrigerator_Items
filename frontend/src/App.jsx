import { useState, useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Weirdest Fridge Items";
  }, []);

  const [weirdItems, setWeirdItems] = useState([
    "Toothpaste",
    "Coconut",
    "Remote Control",
    "Old Socks",
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim() !== "") {
      setWeirdItems([...weirdItems, newItem]);
      setNewItem("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white", color: "#333", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "20px", textAlign: "center", width: "100vw" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "purple", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
          List of the Weirdest Refrigerator Items People Keep
        </h1>
        <p style={{ fontSize: "18px", color: "#666", fontStyle: "italic", marginBottom: "20px" }}>
          Discover the weirdest things people keep in their fridge! 😱
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", maxWidth: "400px", width: "100%" }}>
          <input
            type="text"
            placeholder="Enter a weird item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", width: "100%", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)" }}
          />
          <button
            onClick={addItem}
            style={{ backgroundColor: "purple", color: "white", padding: "10px 20px", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", border: "none", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)" }}
          >
            Submit
          </button>
        </div>
        <div style={{ backgroundColor: "#f3e5f5", padding: "20px", borderRadius: "10px", width: "100%", maxWidth: "400px", textAlign: "center", marginTop: "20px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid purple" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "purple" }}>Top Weirdest Items</h2>
          <ul style={{ marginTop: "10px", listStyleType: "disc", paddingInlineStart: "20px", textAlign: "left" }}>
            {weirdItems.map((item, index) => (
              <li key={index} style={{ marginTop: "5px", fontSize: "16px", fontWeight: "medium" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
