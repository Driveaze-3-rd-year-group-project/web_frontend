import React, { useState } from 'react';

function AssignedJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const jobs = [
    {
      jobId: "J001",
      vehicleNo: "AB1234",
      vehicleBrand: "Toyota",
      vehicleModel: "Corolla",
      status: "Completed",
      actions: "View Details",
      customerProblem: "Engine noise when starting",
    },
    {
      jobId: "J002",
      vehicleNo: "BC2345",
      vehicleBrand: "Honda",
      vehicleModel: "Civic",
      status: "Pending",
      actions: "View Details",
      customerProblem: "Brakes are making squeaky sound",
    },
    {
      jobId: "J003",
      vehicleNo: "CD3456",
      vehicleBrand: "Nissan",
      vehicleModel: "Altima",
      status: "Completed",
      actions: "View Details",
      customerProblem: "Air conditioning not working",
    },
    {
      jobId: "J004",
      vehicleNo: "DE4567",
      vehicleBrand: "Ford",
      vehicleModel: "Focus",
      status: "Pending",
      actions: "View Details",
      customerProblem: "Flat tire",
    },
    {
      jobId: "J005",
      vehicleNo: "EF5678",
      vehicleBrand: "Chevrolet",
      vehicleModel: "Malibu",
      status: "Completed",
      actions: "View Details",
      customerProblem: "Battery draining too fast",
    },
  ];

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Assigned Jobs
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Filter by Job Status</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">All Jobs</option>
            <option value="pending">Pending Jobs</option>
            <option value="completed">Completed Jobs</option>
          </select>
        </div>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Job ID</th>
              <th className="py-3 px-6">Vehicle No</th>
              <th className="py-3 px-6">Vehicle Brand</th>
              <th className="py-3 px-6">Vehicle Model</th>
              <th className="py-3 px-6">Job Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6 whitespace-nowrap">{job.jobId}</td>
                <td className="py-3 px-6 whitespace-nowrap">{job.vehicleNo}</td>
                <td className="py-3 px-6 whitespace-nowrap">{job.vehicleBrand}</td>
                <td className="py-3 px-6 whitespace-nowrap">{job.vehicleModel}</td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      job.status === "Completed" ? "text-green-500" : "text-yellow-500"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">Job Details</h3>
            <div className="mt-4">
              <p className="font-medium">Job ID: {selectedJob.jobId}</p>
              <p className="font-medium">Vehicle No: {selectedJob.vehicleNo}</p>
              <p className="font-medium">Vehicle Brand: {selectedJob.vehicleBrand}</p>
              <p className="font-medium">Vehicle Model: {selectedJob.vehicleModel}</p>
              <p className="font-medium">Status: {selectedJob.status}</p>
              <p className="mt-2 text-gray-700">Customer's Problem: {selectedJob.customerProblem}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 text-white bg-red-500 hover:bg-red-400 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedJobs;
