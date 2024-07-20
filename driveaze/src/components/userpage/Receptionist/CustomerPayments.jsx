import React, { useState } from "react";

const CustomerPayments = () => {
  const initialBills = [
    {
      id: 1,
      brand: "Toyota",
      model: "Camry",
      vehicleNumber: "XYZ 1234",
      status: "Completed",
      image: "TC",
      totalAmount: 1200,
    },
    {
      id: 2,
      brand: "Honda",
      model: "Accord",
      vehicleNumber: "ABC 5678",
      status: "Pending",
      image: "HA",
      totalAmount: 1500,
    },
    {
      id: 3,
      brand: "Ford",
      model: "Mustang",
      vehicleNumber: "LMN 9101",
      status: "Pending",
      image: "FM",
      totalAmount: 2000,
    },
    {
      id: 4,
      brand: "Chevrolet",
      model: "Camaro",
      vehicleNumber: "JKL 1213",
      status: "Completed",
      image: "CC",
      totalAmount: 1800,
    },
    {
      id: 5,
      brand: "BMW",
      model: "3 Series",
      vehicleNumber: "QRS 1415",
      status: "Pending",
      image: "B3S",
      totalAmount: 2200,
    },
    {
      id: 6,
      brand: "Audi",
      model: "A4",
      vehicleNumber: "TUV 1617",
      status: "Pending",
      image: "AA4",
      totalAmount: 2400,
    },
  ];

  const [bills, setBills] = useState(initialBills);
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBills = bills.filter((bill) => {
    if (filter === "All") return true;
    return bill.status === filter;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Customer Payments
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex max-w-md mx-auto"
          >
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
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 space-x-4">
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-4 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredBills.map((bill) => (
          <div
            key={bill.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-start"
          >
            <div className="flex justify-between items-center w-full">
              <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full mb-4">
                {bill.image}
              </div>
              <span
                className={`${
                  bill.status === "Completed"
                    ? "bg-white text-green-500"
                    : "bg-white text-yellow-500"
                }`}
              >
                {bill.status}
              </span>
            </div>
            <h2 className="text-xl font-bold">
              {bill.brand} {bill.model}
            </h2>
            <p className="text-gray-600">{bill.vehicleNumber}</p>
            <p className="text-black font-bold mt-2">
              Total Amount: LKR{bill.totalAmount}
            </p>
            <div className="flex justify-between items-center w-full mt-4">
              <a
                href="/payment"
                className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg duration-150"
              >
                Payment
              </a>
              <a
                href="/viewbill"
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Edit Bill
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPayments;
