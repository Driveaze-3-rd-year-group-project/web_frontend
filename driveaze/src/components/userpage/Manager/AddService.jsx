import React, { useState } from "react";

const AddService = () => {
  const [serviceTypeName, setServiceTypeName] = useState("");
  const [pricePerManHour, setPricePerManHour] = useState("");

  const handleAddServiceType = (e) => {
    e.preventDefault();
    // You can add functionality to handle the submission later.
    alert(`Service Type: ${serviceTypeName}, Price per Man Hour: ${pricePerManHour}`);
    setServiceTypeName("");
    setPricePerManHour("");
  };

  const handleBack = () => {
    // Add functionality to navigate back
    alert("Going back...");
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Service Type</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleAddServiceType} className="space-y-5">
          <div>
            <label className="block font-medium">Service Type Name</label>
            <input
              type="text"
              value={serviceTypeName}
              onChange={(e) => setServiceTypeName(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Service Type Name"
            />
          </div>
          <div>
            <label className="block font-medium">Price per Man Hour</label>
            <input
              type="number"
              value={pricePerManHour}
              onChange={(e) => setPricePerManHour(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Price"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
          <a
                href="/servicetypes"
                className="w-2/5 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150 text-center"
              >
                Back
              </a>
            <button
              type="submit"
              className="w-2/5 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 text-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
