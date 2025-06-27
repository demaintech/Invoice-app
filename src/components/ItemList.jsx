import React, { useState } from "react";

const InvoiceItemList = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  return (
    <div className="max-w-2xl mx-auto font-sans">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Item List</h3>

      <div className="flex font-semibold text-sm text-gray-500 mb-2">
        <div className="flex-2 w-2/5">Item Name</div>
        <div className="flex-1 w-1/5">Qty.</div>
        <div className="flex-1 w-1/5">Price</div>
        <div className="flex-1 w-1/5">Total</div>
        <div className="w-6"></div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            className="flex-2 w-2/5 p-2 rounded-lg border border-gray-300"
            type="text"
            placeholder="Item name"
            value={item.name}
            onChange={(e) => updateItem(index, "name", e.target.value)}
          />
          <input
            className="flex-1 w-1/5 p-2 rounded-lg border border-gray-300 ml-2"
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateItem(index, "qty", parseInt(e.target.value))}
          />
          <input
            className="flex-1 w-1/5 p-2 rounded-lg border border-gray-300 ml-2"
            type="number"
            min="0"
            step="0.01"
            value={item.price}
            onChange={(e) =>
              updateItem(index, "price", parseFloat(e.target.value))
            }
          />
          <div className="flex-1 w-1/5 ml-2 font-semibold text-gray-700">
            {(item.qty * item.price).toFixed(2)}
          </div>
          <button
            onClick={() => deleteItem(index)}
            className="ml-2 text-gray-400 hover:text-red-500"
            title="Delete item"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full mt-4 py-3 bg-indigo-50 text-indigo-600 font-medium rounded-xl hover:bg-indigo-100 transition"
      >
        + Add New Item
      </button>
    </div>
  );
};

export default InvoiceItemList;
