import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';

const VehicleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const tableItems = [
    {
      vehicleNumber: "ABC-1234",
      vehicleModel: "Toyota Corolla",
      ownerName: "Nimal Perera",
      ownerEmail: "nimal.perera@example.lk",
      phoneNumber: "071-2345678",
      registeredDate: "2022-01-01",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    {
      vehicleNumber: "DEF-5678",
      vehicleModel: "Honda Civic",
      ownerName: "Kumari Silva",
      ownerEmail: "kumari.silva@example.lk",
      phoneNumber: "070-2345678",
      registeredDate: "2022-02-15",
      avatar: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000",
    },
    {
      vehicleNumber: "GHI-9101",
      vehicleModel: "Ford Focus",
      ownerName: "Arjun Fernando",
      ownerEmail: "arjun.fernando@example.lk",
      phoneNumber: "077-2345678",
      registeredDate: "2023-03-20",
      avatar: "https://img.icons8.com/?size=100&id=57660&format=png&color=000000",
    },
    {
      vehicleNumber: "JKL-1123",
      vehicleModel: "Chevrolet Malibu",
      ownerName: "Anusha Rajapakse",
      ownerEmail: "anusha.rajapakse@example.lk",
      phoneNumber: "076-2345678",
      registeredDate: "2022-04-10",
      avatar: "https://img.icons8.com/?size=100&id=57661&format=png&color=000000",
    },
    {
      vehicleNumber: "MNO-1456",
      vehicleModel: "Nissan Altima",
      ownerName: "Kasun Bandara",
      ownerEmail: "kasun.bandara@example.lk",
      phoneNumber: "075-2345678",
      registeredDate: "2024-05-30",
      avatar: "https://img.icons8.com/?size=100&id=57662&format=png&color=000000",
    },
    {
      vehicleNumber: "PQR-7890",
      vehicleModel: "Honda Accord",
      ownerName: "Samantha Perera",
      ownerEmail: "samantha.perera@example.lk",
      phoneNumber: "074-2345678",
      registeredDate: "2024-06-15",
      avatar: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000",
    },
    {
      vehicleNumber: "VWX-6789",
      vehicleModel: "Toyota Camry",
      ownerName: "Dilani Wijesinghe",
      ownerEmail: "dilani.wijesinghe@example.lk",
      phoneNumber: "072-2345678",
      registeredDate: "2024-08-10",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
  ];

  // Filter table items based on search term
  const filteredItems = tableItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.vehicleNumber.toLowerCase().includes(term) ||
      item.ownerName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between mb-3">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Vehicle Management
          </h3>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        {/* Left Section */}
        <div className="flex space-x-4">
          

          {/* Search Input */}
          <div className="flex flex-col">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* Search Icon */}
                <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
        {/* Right Section */}
        <a
          href="/addvehicle"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Vehicle
        </a>
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
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="py-3 px-6 whitespace-nowrap">
                  {item.vehicleNumber}
                </td>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={item.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={item.vehicleModel}
                  />
                  <span>{item.vehicleModel}</span>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {item.ownerName}
                </td>
                <td className="py-3 px-6 whitespace-nowrap text-ellipsis overflow-hidden max-w-xs">
                  {item.ownerEmail}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {item.phoneNumber}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {item.registeredDate}
                </td>
                <td className="text-left py-3 px-6 whitespace-nowrap">
                  <a
                    href="/editvehicle"
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleManagement;
