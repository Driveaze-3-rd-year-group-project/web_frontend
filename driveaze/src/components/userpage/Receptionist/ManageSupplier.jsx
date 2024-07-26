import React, { useState } from "react";

const ManageSupplier = () => {
  // Dummy data for UI implementation
  const supplier = {
    name: "Auto Parts Inc.",
    email: "contact@autoparts.com",
    phoneNumber: "+1234567890",
    address: "1234 Elm Street, Springfield",
    partsTypes: "Engine Parts, Brakes, Suspension",
  };

  const paymentDetails = [
    {
      id: 1,
      date: "2024-06-01",
      amount: 3000,
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-07-10",
      amount: 1500,
      status: "Pending",
    },
    {
      id: 3,
      date: "2024-08-05",
      amount: 2200,
      status: "Completed",
    },
    {
      id: 4,
      date: "2024-09-15",
      amount: 1800,
      status: "Pending",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Supplier Details
        </h3>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Name:</strong> {supplier.name}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Email:</strong> {supplier.email}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Phone Number:</strong> {supplier.phoneNumber}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Address:</strong> {supplier.address}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Parts Types:</strong> {supplier.partsTypes}
              </p>
            </div>
          </div>
        </div>
        <h4 className="text-gray-800 text-lg font-bold mb-4">Payment Details</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Amount
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {paymentDetails.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6">{payment.date}</td>
                  <td className="py-3 px-6">LKR {payment.amount}</td>
                  <td
                    className={`py-3 px-6 ${
                      payment.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <a
            href="/supplierpayments/addbill"
            className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Add New Bill
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManageSupplier;
