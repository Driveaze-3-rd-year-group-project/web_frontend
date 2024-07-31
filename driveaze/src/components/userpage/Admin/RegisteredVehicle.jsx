import React, { useState } from 'react';

function RegisteredVehicle() {
  // Dummy data for demonstration
  const vehicles = [
    { name: 'John Doe', vehicleType: 'SUV', licenseNumber: 'ABC123', contactNumber: '123-456-7890', registeredDate: '2022-01-10' },
    { name: 'Jane Smith', vehicleType: 'Sedan', licenseNumber: 'XYZ456', contactNumber: '987-654-3210', registeredDate: '2022-01-15' },
    { name: 'Michael Brown', vehicleType: 'Truck', licenseNumber: 'DEF789', contactNumber: '555-123-4567', registeredDate: '2022-02-20' },
    { name: 'Emily Davis', vehicleType: 'Motorcycle', licenseNumber: 'GHI321', contactNumber: '777-888-9999', registeredDate: '2022-03-05' },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (name) => {
    alert(`Delete vehicle for ${name}`);
    // Implement your logic to delete vehicle
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Registered Vehicles
            </h3>
            <p className="text-gray-600 mt-2">
              List of registered vehicles with contact details.
            </p>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-36 sm:w-48 py-3 pl-3 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
            <button className="ml-2 py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Search
            </button>
          </div>
        </div>

        <div className="shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Vehicle Type</th>
                <th className="py-3 px-6">License Number</th>
                <th className="py-3 px-6">Contact Number</th>
                <th className="py-3 px-6">Registered Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredVehicles.map((vehicle, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.vehicleType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.licenseNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.contactNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.registeredDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(vehicle.name)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegisteredVehicle;
