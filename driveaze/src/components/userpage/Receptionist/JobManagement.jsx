import React, { useState } from "react";

const JobManagement = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusStyle = (status) => {
    return status === "Completed" ? "font-medium text-green-500" : "font-medium text-yellow-500";
  };

  const vehicleData = {
    "ABC-1234": {
      model: "Toyota Corolla",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "CDE-5678": {
      model: "Honda Civic",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "EFG-9101": {
      model: "Ford Focus",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "GHA-1213": {
      model: "Chevrolet Malibu",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "IJK-1415": {
      model: "Nissan Altima",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "KLM-1617": {
      model: "Suzuki Swift",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
    "MNA-1819": {
      model: "Hyundai Elantra",
      avatar: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
    },
  };

  const tableItems = [
    {
      vehicleNumber: "ABC-1234",
      jobStartedDate: "2024-07-01",
      assignedSupervisor: "Kasun Perera",
      status: "Ongoing",
    },
    {
      vehicleNumber: "CDE-5678",
      jobStartedDate: "2024-07-03",
      assignedSupervisor: "Nimal Silva",
      status: "Completed",
    },
    {
      vehicleNumber: "EFG-9101",
      jobStartedDate: "2024-07-07",
      assignedSupervisor: "Amila Fernando",
      status: "Ongoing",
    },
    {
      vehicleNumber: "GHA-1213",
      jobStartedDate: "2024-07-10",
      assignedSupervisor: "Sunil Rajapaksha",
      status: "Completed",
    },
    {
      vehicleNumber: "IJK-1415",
      jobStartedDate: "2024-07-12",
      assignedSupervisor: "Tharindu Gamage",
      status: "Ongoing",
    },
    {
      vehicleNumber: "KLM-1617",
      jobStartedDate: "2024-07-15",
      assignedSupervisor: "Dhanushka Weerasinghe",
      status: "Completed",
    },
    {
      vehicleNumber: "MNA-1819",
      jobStartedDate: "2024-07-18",
      assignedSupervisor: "Chamilka Gunawardena",
      status: "Ongoing",
    },
  ];

  const filteredItems = tableItems.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "ongoing" && item.status === "Ongoing") ||
      (filter === "completed" && item.status === "Completed");

    const matchesSearch =
      item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicleData[item.vehicleNumber]?.model || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Management
        </h3>
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
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          {/* <label className="font-medium mb-1">Filter Jobs</label> */}
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">All Jobs</option>
            <option value="ongoing">Ongoing Jobs</option>
            <option value="completed">Completed Jobs</option>
          </select>
        </div>
        <a
          href="/createnewjob"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Create New Job
        </a>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Vehicle Number</th>
              <th className="py-3 px-6">Vehicle Model</th>
              <th className="py-3 px-6">Job Started Date</th>
              <th className="py-3 px-6">Assigned Supervisor</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredItems.map((item, index) => {
              const vehicleInfo = vehicleData[item.vehicleNumber] || {};
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6 whitespace-nowrap">
                    {item.vehicleNumber}
                  </td>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={vehicleInfo.avatar}
                      className="w-10 h-10 rounded-full"
                      alt={vehicleInfo.model}
                    />
                    <span>{vehicleInfo.model}</span>
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    {item.jobStartedDate}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    {item.assignedSupervisor}
                  </td>
                  <td
                    className={`py-3 px-6 whitespace-nowrap ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    <a
                      href="/jobdetails"
                      className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                      Details
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobManagement;
