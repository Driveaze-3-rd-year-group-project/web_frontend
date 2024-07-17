import React from "react";

const VehicleManagement = () => {
  const tableItems = [
    {
      vehicleNumber: "ABC-1234",
      vehicleModel: "Toyota Corolla",
      ownerName: "Liam James",
      ownerEmail: "LiamJames@gmail.com",
      phoneNumber: "071-1234567",
      registeredDate: "2022-01-01",
      avatar: "https://via.placeholder.com/150?text=TC",
    },
    {
      vehicleNumber: "DEF-5678",
      vehicleModel: "Honda Civic",
      ownerName: "Olivia Emma",
      ownerEmail: "OliviaEmma@gmail.com",
      phoneNumber: "070-1234567",
      registeredDate: "2022-02-15",
      avatar: "https://via.placeholder.com/150?text=HC",
    },
    {
      vehicleNumber: "GHI-9101",
      vehicleModel: "Ford Focus",
      ownerName: "William Benjamin",
      ownerEmail: "WilliamBenjamin@gmail.com",
      phoneNumber: "077-1234567",
      registeredDate: "2022-03-20",
      avatar: "https://via.placeholder.com/150?text=FF",
    },
    {
      vehicleNumber: "JKL-1123",
      vehicleModel: "Chevrolet Malibu",
      ownerName: "Henry Theodore",
      ownerEmail: "HenryTheodore@gmail.com",
      phoneNumber: "076-1234567",
      registeredDate: "2022-04-10",
      avatar: "https://via.placeholder.com/150?text=CM",
    },
    {
      vehicleNumber: "MNO-1456",
      vehicleModel: "Nissan Altima",
      ownerName: "Amelia Elijah",
      ownerEmail: "AmeliaElijah@gmail.com",
      phoneNumber: "075-1234567",
      registeredDate: "2022-05-30",
      avatar: "https://via.placeholder.com/150?text=NA",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Vehicle Management
          </h3>
        </div>
        <div className="mt-3 md:mt-0">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex max-w-md mx-auto"
          >
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
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
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
            {tableItems.map((item, idx) => (
              <tr key={idx}>
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
                <td className="py-3 px-6 whitespace-nowrap">
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
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
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
