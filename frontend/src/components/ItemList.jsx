export default function ItemList({ weirdItems, setSelectedItem }) {
    return (
      <div className="bg-purple-100 p-6 rounded-lg w-full max-w-sm text-center mt-6 shadow-lg border border-purple-500">
        <h2 className="text-2xl font-bold text-purple-700">Top Weirdest Items</h2>
        {weirdItems.length > 0 ? (
          <ul className="mt-3 list-disc text-left text-gray-800 space-y-2 pl-5">
            {weirdItems.map((item) => (
              <li
                key={item?._id}
                className="cursor-pointer text-blue-600 hover:underline font-medium"
                onClick={() => setSelectedItem(item)}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">No weird items found.</p>
        )}
      </div>
    );
  }
  