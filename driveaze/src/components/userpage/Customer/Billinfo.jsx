import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

const Billinfo = ({ vehicle }) => {
  // Provide default values to avoid undefined errors
  const location = useLocation();
  const vehicleData = location.state; 
  const { date, brand, vehi_no, description, status,cost } = vehicleData;

  const initialServices = vehicle?.initialServices || [];

  const [services, setServices] = useState(initialServices);

  const totalCost = 402000;

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold">
              {brand}
            </h2>
            <p className="text-gray-600">{vehicleData.vehi_no}</p>
          </div>
        </div>
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
            {services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="py-2 px-4">{vehicleData.description}</td>
                <td className="py-2 px-4 text-right">{service.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 border-t">
              <td className="py-2 px-4 ">{vehicleData.description}</td>
              <td className="py-2 px-4 text-right font-bold">
                {cost}
              </td>
            </tr>
            <tr className="bg-gray-100 border-t">
              <td className="py-2 px-4 font-bold">Total</td>
              <td className="py-2 px-4 text-right font-bold">
                {cost}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        {/* Conditionally render the button based on status */}
        {status !== "Completed" && (
          <button className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Pay Online
          </button>
        )}
      </div>
    </div>
  );
};

export default Billinfo;
