import React, { useState } from "react";

const AddVehicleModelBrand = () => {
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");

  const handleAddVehicle = (e) => {
    e.preventDefault();
    alert(`Vehicle Model: ${vehicleModel}, Vehicle Brand: ${vehicleBrand}`);
    setVehicleModel("");
    setVehicleBrand("");
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      {/* Title */}
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Vehicle Model & Brand</h3>
      </div>

      {/* Form */}
      <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleAddVehicle} className="space-y-5">
          {/* Vehicle Model Input */}
          <div>
            <label className="block font-medium">Vehicle Model</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Vehicle Model"
            />
          </div>

          {/* Vehicle Brand Input */}
          <div>
            <label className="block font-medium">Vehicle Brand</label>
            <input
              type="text"
              value={vehicleBrand}
              onChange={(e) => setVehicleBrand(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Vehicle Brand"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <a
              href="/vehiclemodelbrand"
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

export default AddVehicleModelBrand;
