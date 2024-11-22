import React, { useState } from 'react';

function RegisteredVehicle() {
  // Dummy data for demonstration
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

  const filteredItems = tableItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.vehicleNumber.toLowerCase().includes(term) ||
      item.ownerName.toLowerCase().includes(term)
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisteredVehicle;
