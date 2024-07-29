import React, { useState } from "react";

const AddBill = () => {
  const [billDate, setBillDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [items, setItems] = useState([{ name: "", quantity: "", amount: "" }]);

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: "", amount: "" }]);
  };

  const handleChangeItem = (index, e) => {
    const newItems = items.slice();
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ billDate, amount, status, items });
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Add New Bill</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Bill Date</label>
              <input
                type="date"
                value={billDate}
                onChange={(e) => setBillDate(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-medium">Bill Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
              />
            </div>
            <div>
              <label className="font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <h4 className="text-gray-800 text-lg font-bold mb-4">Items</h4>
              {items.map((item, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg">
                  <div className="mb-4">
                    <label className="font-medium">Item Name</label>
                    <input
                      type="text"
                      name="name"
                      value={item.name}
                      onChange={(e) => handleChangeItem(index, e)}
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleChangeItem(index, e)}
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="font-medium">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={item.amount}
                      onChange={(e) => handleChangeItem(index, e)}
                      className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Add Another Item
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Save Bill
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddBill;
