import React, { useState } from "react";
import { FaSearch, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function VehicleModelBrand() {
  const [searchTerm, setSearchTerm] = useState("");

  const vehicles = [
    { model: "Corolla", brand: "Toyota" },
    { model: "Civic", brand: "Honda" },
    { model: "Altima", brand: "Nissan" },
    { model: "Model S", brand: "Tesla" },
    { model: "CX-5", brand: "Mazda" },
  ];

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (vehicleModel) => {
    alert(`Delete action triggered for: ${vehicleModel}`);
    // Add logic to handle delete action
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Vehicle Model & Brands
        </h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-3">
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <a
          href="/addvehiclemodelbrand"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Model & Brand
        </a>
      </div>

      {/* Vehicle Table */}
      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Vehicle Model</th>
              <th className="py-3 px-6">Brand</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredVehicles.map((vehicle, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6">{vehicle.model}</td>
                <td className="py-3 px-6">{vehicle.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    <Link
                      to={`/update-vehicle/${vehicle.model}`}
                      className="text-indigo-600 hover:text-indigo-800 text-xl"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle.model)}
                      className="text-red-500 hover:text-red-800 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleModelBrand;
