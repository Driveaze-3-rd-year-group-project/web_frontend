import React, { useState } from "react";

const Billing = () => {
  const initialBills = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      vehicleNumber: "XYZ 1234",
      status: "Ongoing",
      image: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      customerName: "Nimali Perera", 
    },
    {
      id: 2,
      brand: "Honda",
      model: "Accord",
      vehicleNumber: "ABC 5678",
      status: "Ongoing",
      image: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000",
      customerName: "Kamal Silva", 
    },
   {
      id: 3,
      brand: "Ford",
      model: "Mustang",
      vehicleNumber: "LMN 9101",
      status: "Ongoing",
      image: "https://img.icons8.com/?size=100&id=57660&format=png&color=000000",
      customerName: "Dilani Weerasinghe", 
    },
    {
      id: 4,
      brand: "Chevrolet",
      model: "Camaro",
      vehicleNumber: "JKL 1213",
      status: "Ongoing",
      image: "https://img.icons8.com/?size=100&id=57661&format=png&color=000000",
      customerName: "Ranjith Gunawardena", 
    },
    {
      id: 5,
      brand: "Nissan",
      model: "Sentra",
      vehicleNumber: "QRS 1415",
      status: "Ongoing",
      image: "https://img.icons8.com/?size=100&id=57662&format=png&color=000000",
      customerName: "Samanthi Jayasuriya", 
    },
    {
      id: 6,
      brand: "Toyota",
      model: "Corolla",
      vehicleNumber: "TUV 1617",
      status: "Ongoing",
      image: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
      customerName: "Chamara Perera", 
    },
  ];

  const [bills, setBills] = useState(initialBills);
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

  const filteredBills = bills
    .filter((bill) => {
      return (
        (selectedBrand ? bill.brand === selectedBrand : true) &&
        (selectedModel ? bill.model === selectedModel : true) &&
        (searchTerm
          ? bill.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) // Include customer name in search
          : true)
      );
    });

  const brands = [...new Set(initialBills.map((bill) => bill.brand))];
  const models = [...new Set(initialBills.map((bill) => bill.model))];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Billing</h3>
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
        <a
          href="/createbill"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 mb-2"
        >
          Create Bill
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredBills.map((bill) => (
          <div
            key={bill.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-start"
          >
            <div className="flex justify-between items-center w-full">
              <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full mb-4">
                <img className="w-16 h-16 rounded-full" src={`${bill.image}`} alt={bill.brand} />
              </div>
              <span className="text-yellow-500 font-medium">{bill.status}</span>
            </div>
            <h2 className="text-xl font-bold">
              {bill.brand} {bill.model}
            </h2>
            <p className="text-gray-600">{bill.vehicleNumber}</p>
            <p className="text-gray-600 mt-2">
              <strong>Customer: {bill.customerName}</strong> {/* Bold customer name */}
            </p>
            <div className="flex justify-end items-center w-full mt-4">
              <a
                href="/viewbill"
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                View Bill
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;
