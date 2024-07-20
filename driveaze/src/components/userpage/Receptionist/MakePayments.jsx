import React from "react";

const MakePayments = ({ bill, goBack }) => {
  const totalCost = bill.services.reduce((total, service) => total + service.cost, 0);

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">Make Payment</h3>
      <div className="border border-gray-300 rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full">
              {bill.image}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {bill.brand} {bill.model}
              </h2>
              <p className="text-gray-600">{bill.vehicleNumber}</p>
            </div>
          </div>
          <span className={`py-2 px-4 rounded-lg ${bill.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {bill.status}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Service/Product</th>
                <th className="py-2 px-4 text-right">Cost (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {bill.services.map((service) => (
                <tr key={service.id} className="border-b">
                  <td className="py-2 px-4">{service.description}</td>
                  <td className="py-2 px-4 text-right">{service.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t">
                <td className="py-2 px-4 font-bold">Total</td>
                <td className="py-2 px-4 text-right font-bold">
                  {totalCost.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
        <button
            onClick={goBack}
            className="py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
          >
            Back
          </button>
          <button
            onClick={() => alert("Payment Completed")}
            className="ml-4 py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg duration-150"
          >
            Payment Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakePayments;
