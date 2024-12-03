import React, { useState, useEffect } from 'react';
import UserService from '../../service/UserService';

function RegisteredVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  // const fetchVehicles = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       console.error("No token found in localStorage");
  //       return;
  //     }

  //     const response = await UserService.getAllCustomerVehicles(token);
  //     console.log("Fetched Vehicles Data:", response); // Debugging log
  //     if (response && Array.isArray(response.customerVehicleList)) {
  //       setVehicles(response.customerVehicleList);
  //     } else {
  //       console.error("Unexpected API response structure:", response);
  //       setVehicles([]); // Default to an empty array
  //     }
  //   } catch (error) {
  //     console.error('Error fetching vehicles:', error);
  //     setVehicles([]); // Handle errors gracefully
  //   }
  // };

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllCustomerVehicles(token);

      // console.log('Fetched paginated vehicles:', response);
  
      // const vehiclesData = response?.content || [];

      const updatedVehicles = await Promise.all(
        response.customerVehicleList.map(async (vehicle) => {
          try {
            // Fetch Brand Details
            const brandResponse = await UserService.getVehicleBrandById(vehicle.vehicleBrandId, token);
            const brandName = brandResponse?.vehicleBrand?.brandName || "Unknown Brand";
  
            // Fetch Model Details
            const modelResponse = await UserService.getVehicleModelById(vehicle.vehicleModelId, token);
            const modelName = modelResponse?.vehicleModel?.modelName || "Unknown Model";
  
            return {
              ...vehicle,
              brandName,
              modelName,
            };
          } catch (error) {
            console.error(`Error fetching details for vehicle ID ${vehicle.vehicleId}:`, error);
            return {
              ...vehicle,
              brandName: "Unknown Brand",
              modelName: "Unknown Model",
            };
          }
        })
      );

      setVehicles(updatedVehicles);
      // setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles([]);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return (
      vehicle.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.ownerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Registered Vehicles
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <div className="relative w-full">
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

      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Vehicle Number</th>
              <th className="py-3 px-6">Vehicle Model</th>
              <th className="py-3 px-6">Owner's Name</th>
              <th className="py-3 px-6">Owner's Email</th>
              <th className="py-3 px-6">Registered Phone No</th>
              <th className="py-3 px-6">Registered Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.vehicleNo}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.brandName} {vehicle.modelName}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.ownerName}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.ownerEmail}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.ownerPhone}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicle.registeredDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisteredVehicle;
