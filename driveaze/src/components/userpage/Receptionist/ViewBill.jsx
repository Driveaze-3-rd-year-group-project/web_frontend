import React, { useState } from "react";

const ViewBill = ({ vehicle }) => {
  // Provide default values to avoid undefined errors
  const initialServices = vehicle?.initialServices || [];
  const vehicleImage = vehicle?.image || "TC";
  const vehicleBrand = vehicle?.brand || "Toyota";
  const vehicleModel = vehicle?.model || "Camry";
  const vehicleNumber = vehicle?.vehicleNumber || "XYZ 1234";

  const [services, setServices] = useState(initialServices);

  const handleAddService = () => {
    const service = prompt("Enter new service:");
    const cost = parseFloat(prompt("Enter new cost:"));
    if (service && !isNaN(cost)) {
      setServices([...services, { id: services.length + 1, service, cost }]);
    }
  };

  const handleRemoveService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleEditService = (id, updatedService) => {
    setServices(
      services.map((service) =>
        service.id === id ? updatedService : service
      )
    );
  };

  const totalCost = services.reduce((total, service) => total + parseFloat(service.cost), 0);

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full">
            {vehicleImage}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {vehicleBrand} {vehicleModel}
            </h2>
            <p className="text-gray-600">{vehicleNumber}</p>
          </div>
        </div>
        <button
          onClick={handleAddService}
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Service/Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Service/Product</th>
              <th className="py-2 px-4 text-right">Cost (LKR)</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b">
                <td className="py-2 px-4">{service.service}</td>
                <td className="py-2 px-4 text-right">{service.cost}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleRemoveService(service.id)}
                    className="py-1 px-3 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() =>
                      handleEditService(service.id, {
                        ...service,
                        service: prompt("Enter new service:", service.service),
                        cost: parseFloat(prompt("Enter new cost:", service.cost)),
                      })
                    }
                    className="py-1 px-3 text-blue-600 hover:text-blue-800 ml-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 border-t">
              <td className="py-2 px-4 font-bold">Total</td>
              <td className="py-2 px-4 text-right font-bold">
                {totalCost.toFixed(2)}
              </td>
              <td className="py-2 px-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150">
          Save
        </button>
        <button className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Finalize Bill
        </button>
      </div>
    </div>
  );
};

export default ViewBill;
