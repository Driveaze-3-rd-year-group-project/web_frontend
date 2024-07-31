import React, { useState } from "react";

const ManageSupplier = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      items: [
        { name: "Engine Oil", quantity: 2, amount: 1000 },
        { name: "Air Filter", quantity: 1, amount: 500 },
      ],
    },
    {
      id: 2,
      date: "2024-07-10",
      amount: 1500,
      status: "Pending",
      items: [
        { name: "Brake Pads", quantity: 4, amount: 800 },
        { name: "Transmission Fluid", quantity: 1, amount: 300 },
      ],
    },
    // Additional dummy data...
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div className="text-right">
              <p className="font-semibold text-gray-700">
                <strong>Parts Types:</strong> {supplier.partsTypes}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-gray-800 text-lg font-bold">Payment Details</h4>
          <a
            href="/addsupplierbill"
            className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Add New Bill
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Bill Amount
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Status
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {paymentDetails.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-100">
                  <td className="py-3 px-6">{payment.date}</td>
                  <td className="py-3 px-6">LKR {payment.amount}</td>
                  <td
                    className={`py-3 px-6 font-medium ${
                      payment.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={openModal}
                      className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-800 text-lg font-bold">Bill Details</h4>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-700">
                <strong>Date:</strong> 2024-06-01
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Bill Amount:</strong> LKR 3000
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Status:</strong> Completed
              </p>
            </div>
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-gray-600 font-medium text-left">
                    Item Name
                  </th>
                  <th className="py-3 px-6 text-gray-600 font-medium text-left">
                    Quantity
                  </th>
                  <th className="py-3 px-6 text-gray-600 font-medium text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-6">Engine Oil</td>
                  <td className="py-3 px-6">2</td>
                  <td className="py-3 px-6">LKR 1000</td>
                </tr>
                <tr>
                  <td className="py-3 px-6">Air Filter</td>
                  <td className="py-3 px-6">1</td>
                  <td className="py-3 px-6">LKR 500</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-3 px-6" colSpan="2">Total</td>
                  <td className="py-3 px-6">LKR 1500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSupplier;
