import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ViewHistory = () => {
  const { vehicleNumber } = useParams();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const tableItems = [
    {
      date: "2022-01-10",
      details: "Oil change and tire rotation",
      technician: "Saman Kumara",
      type: "service",
    },
    {
      date: "2022-03-14",
      details: "Brake inspection and replacement",
      technician: "Kasun Perera",
      type: "repair",
    },
    {
      date: "2022-05-20",
      details: "Engine diagnostics and repair",
      technician: "Kasun Perera",
      type: "repair",
    },
    {
      date: "2022-07-25",
      details: "Transmission fluid replacement",
      technician: "Kasun Perera",
      type: "service",
    },
    {
      date: "2022-09-30",
      details: "Battery replacement",
      technician: "Saman Kumara",
      type: "service",
    },
  ];

  const filteredItems = tableItems.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch =
      item.details.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h2 className="text-2xl font-bold">Vehicle History</h2>
          <p className="text-gray-600">{vehicleNumber}</p>
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
          <label className="font-medium mb-1">Filter Jobs</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">Full History</option>
            <option value="service">Service History</option>
            <option value="repair">Repairing History</option>
          </select>
        </div>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Details</th>
              {filter !== "service" && <th className="py-3 px-6">Technician</th>}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredItems.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6 whitespace-nowrap">{item.date}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.details}</td>
                {filter !== "service" && (
                  <td className="py-3 px-6 whitespace-nowrap">
                    {item.technician}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHistory;
