import React from "react";

const JobDetails = () => {
  // Dummy data for UI implementation
  const job = {
    vehicleNumber: "ABC-1234",
    jobStartedDate: "2022-01-10",
    assignedSupervisor: "Kasun Perera",
    status: "Ongoing",
    service: "Full service",
  };

  const jobDetails = [
    {
      date: "2022-01-12",
      detail: "Changed vehicle oil",
      mechanic: "John Doe",
    },
    {
      date: "2022-01-15",
      detail: "Serviced vehicle",
      mechanic: "Jane Smith",
    },
    {
      date: "2022-01-18",
      detail: "Replaced brake pads",
      mechanic: "Michael Johnson",
    },
    {
      date: "2022-01-20",
      detail: "Checked tire pressure",
      mechanic: "Emily Davis",
    },
    {
      date: "2022-01-22",
      detail: "Replaced air filter",
      mechanic: "James Brown",
    },
    {
      date: "2022-01-25",
      detail: "Checked battery health",
      mechanic: "Jennifer Wilson",
    },
    {
      date: "2022-01-28",
      detail: "Performed wheel alignment",
      mechanic: "William Moore",
    },
    {
      date: "2022-01-30",
      detail: "Cleaned fuel injectors",
      mechanic: "Jessica Garcia",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Details
        </h3>
        <a
          href="/jobmanagement"
          className="px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
        >
          Back
        </a>
      </div>
      
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Number:</strong> {job.vehicleNumber}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Job Started Date:</strong> {job.jobStartedDate}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Assigned Supervisor:</strong> {job.assignedSupervisor}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    job.status === "Completed"
                      ? "text-green-600"
                      : "text-blue-600"
                  }
                >
                  {job.status}
                </span>
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Service Request(Details Given by Customer ):</strong>{" "}
                {job.service}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 shadow-sm border rounded-lg">
          <table className="w-full table-auto text-sm text-left overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Details
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Technician Name
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {jobDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6">{detail.date}</td>
                  <td className="py-3 px-6">{detail.detail}</td>
                  <td className="py-3 px-6">{detail.mechanic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    
  );
};

export default JobDetails;
