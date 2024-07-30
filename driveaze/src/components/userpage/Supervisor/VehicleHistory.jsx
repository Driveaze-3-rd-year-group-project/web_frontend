import React, { useState } from "react";
import { Link } from 'react-router-dom';

const VehicleHistory = () => {
  const initialHistory = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      vehicleNumber: "XYZ 1234",
      image: "TC",
    },
    {
      id: 2,
      brand: "Honda",
      model: "Accord",
      vehicleNumber: "ABC 5678",
      image: "HA",
    },
    {
      id: 3,
      brand: "Ford",
      model: "Mustang",
      vehicleNumber: "LMN 9101",
      image: "FM",
    },
    {
      id: 4,
      brand: "Chevrolet",
      model: "Camaro",
      vehicleNumber: "JKL 1213",
      image: "CC",
    },
    {
      id: 5,
      brand: "BMW",
      model: "3 Series",
      vehicleNumber: "QRS 1415",
      image: "B3S",
    },
    {
      id: 6,
      brand: "Audi",
      model: "A4",
      vehicleNumber: "TUV 1617",
      image: "AA4",
    },
  ];

  const [history, setHistory] = useState(initialHistory);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHistory = history
    .filter((history) => {
      return (
        (selectedBrand ? history.brand === selectedBrand : true) &&
        (selectedModel ? history.model === selectedModel : true) &&
        (searchTerm
          ? history.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            history.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            history.model.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
      );
    });

  const brands = [...new Set(initialHistory.map((history) => history.brand))];
  const models = [...new Set(initialHistory.map((history) => history.model))];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">History</h3>
        </div>
        <div className="mt-3 md:mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 space-x-4">
        <div className="flex space-x-4">
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="py-2 px-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="py-2 px-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredHistory.map((history) => (
          <div
            key={history.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-start"
          >
            <div className="flex justify-between items-center w-full">
              <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full mb-4">
                {history.image}
              </div>
            </div>
            <h2 className="text-xl font-bold">
              {history.brand} {history.model}
            </h2>
            <p className="text-gray-600">{history.vehicleNumber}</p>
            <div className="flex justify-end items-center w-full mt-4">
              <Link
                to={`/vehiclehistory/viewhistory/${history.vehicleNumber}`}
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                View History
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleHistory;
