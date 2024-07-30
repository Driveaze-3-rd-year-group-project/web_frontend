import React, { useState } from "react";

// Dummy data
const dummyVehicle = {
  image: "TC",
  brand: "Toyota",
  model: "Camry",
  vehicleNumber: "XYZ 1234",
  initialServices: [
    { id: 1, service: "Oil Change", cost: "3000" },
    { id: 2, service: "Tire Replacement", cost: "12000" },
  ],
};

const ViewBill = ({ vehicle = dummyVehicle }) => {
  const [services, setServices] = useState(vehicle.initialServices);
  const [modalType, setModalType] = useState(""); // "add", "edit", or "remove"
  const [currentService, setCurrentService] = useState(null);
  const [newService, setNewService] = useState({ service: "", cost: "" });

  const handleAddService = () => {
    setModalType("add");
  };

  const handleEditService = (service) => {
    setCurrentService(service);
    setNewService({ service: service.service, cost: service.cost });
    setModalType("edit");
  };

  const handleRemoveService = (service) => {
    setCurrentService(service);
    setModalType("remove");
  };

  const handleCloseModal = () => {
    setModalType("");
    setNewService({ service: "", cost: "" });
    setCurrentService(null);
  };

  const handleSaveService = () => {
    if (newService.service && !isNaN(parseFloat(newService.cost))) {
      if (modalType === "add") {
        setServices([
          ...services,
          { id: services.length + 1, ...newService, cost: parseFloat(newService.cost) },
        ]);
      } else if (modalType === "edit" && currentService) {
        setServices(
          services.map((service) =>
            service.id === currentService.id ? { ...service, ...newService, cost: parseFloat(newService.cost) } : service
          )
        );
      }
      handleCloseModal();
    } else {
      alert("Please enter valid service details.");
    }
  };

  const handleConfirmRemove = () => {
    if (currentService) {
      setServices(services.filter((service) => service.id !== currentService.id));
      handleCloseModal();
    }
  };

  const totalCost = services.reduce((total, service) => total + parseFloat(service.cost), 0);

  return (
    <div className="max-w-screen-lg mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full">
            {vehicle.image}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {vehicle.brand} {vehicle.model}
            </h2>
            <p className="text-gray-600">{vehicle.vehicleNumber}</p>
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
                    onClick={() => handleRemoveService(service)}
                    className="py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleEditService(service)}
                    className="ml-6 py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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

      <div className="mt-4 flex justify-between items-center">
        <a
          href="/billing"
          className="px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
        >
          Back
        </a>
        <div className="space-x-4">
          <button className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-600 rounded-lg duration-150">
            Save
          </button>
          <button className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Finalize Bill
          </button>
        </div>
      </div>

      {/* Modal for adding/editing service */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              {modalType === "add" ? "Add Service/Product" : "Edit Service/Product"}
            </h3>
            <div className="mb-4">
              <label className="font-medium">Service/Product</label>
              <input
                type="text"
                value={newService.service}
                onChange={(e) => setNewService({ ...newService, service: e.target.value })}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-medium">Cost (LKR)</label>
              <input
                type="number"
                value={newService.cost}
                onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveService}
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for removing service */}
      {modalType === "remove" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Removal</h3>
            <p>Are you sure you want to remove the service "{currentService?.service}"?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBill;
