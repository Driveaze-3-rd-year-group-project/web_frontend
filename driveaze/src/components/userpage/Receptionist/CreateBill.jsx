import React, { useState } from "react";

const CreateBill = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [services, setServices] = useState([{ description: "", cost: "" }]);

  const handleInputChange = (index, event) => {
    const values = [...services];
    values[index][event.target.name] = event.target.value;
    setServices(values);
  };

  const handleAddService = () => {
    setServices([...services, { description: "", cost: "" }]);
  };

  const handleRemoveService = (index) => {
    const values = [...services];
    values.splice(index, 1);
    setServices(values);
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Create Bill</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium">Services/Products</h4>
              <div className="overflow-x-auto">
                <table className="w-full mt-4 border rounded-lg">
                  <thead className="bg-gray-50 text-gray-600 font-medium">
                    <tr>
                      <th className="py-2 px-4 text-left">Description</th>
                      <th className="py-2 px-4 text-right">Cost</th>
                      <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr key={index} className="border-t">
                        <td className="py-2 px-4">
                          <input
                            type="text"
                            name="description"
                            value={service.description}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 text-right">
                          <input
                            type="number"
                            name="cost"
                            value={service.cost}
                            onChange={(e) => handleInputChange(index, e)}
                            required
                            className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          />
                        </td>
                        <td className="py-2 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveService(index)}
                            className="px-3 py-1 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={handleAddService}
                className="mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
              >
                Add Service/Product
              </button>
            </div>

            <div className="flex justify-between items-center mt-6">
              <a
                href="/billing"
                className="px-8 py-3 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
              >
                Back
              </a>
              <button
                type="submit"
                className="px-8 py-3 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
              >
                Save Bill
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateBill;
