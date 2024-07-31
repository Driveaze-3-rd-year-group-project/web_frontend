import React from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const CompletedRepairs = () => {
  const { numberPlate } = useParams();
  // Dummy data for UI implementation
  const job = {
    vehicleNumber: numberPlate,
    jobStartedDate: "2022-01-10",
    assignedSupervisor: "Kasun Perera",
    status: "Ongoing",
    service: "Full service",
  };

  const jobDetails = [
    {
      date: "2022-01-12",
      detail: "Changed vehicle oil",
      mechanic: "Ruwan Kumara",
    },
    {
      date: "2022-01-15",
      detail: "Serviced vehicle",
      mechanic: "Saman Kumara",
    },
    {
      date: "2022-01-18",
      detail: "Replaced brake pads",
      mechanic: "Dasun Pathirana",
    },
    {
      date: "2022-01-20",
      detail: "Checked tire pressure",
      mechanic: "Kamal Perera",
    },
    {
      date: "2022-01-22",
      detail: "Replaced air filter",
      mechanic: "Ruwan Kumara",
    },
    {
      date: "2022-01-25",
      detail: "Checked battery health",
      mechanic: "Dasun Pathirana",
    },
    {
      date: "2022-01-28",
      detail: "Performed wheel alignment",
      mechanic: "Ruwan Kumara",
    },
    {
      date: "2022-01-30",
      detail: "Cleaned fuel injectors",
      mechanic: "Dasun Pathirana",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Details for {numberPlate}
        </h3>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
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
            </div>
          </div>
        </div>
        <h4 className="text-gray-800 text-lg font-bold mb-4">Job Details</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Date
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Detail
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Mechanic
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {jobDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6 ">{detail.date}</td>
                  <td className="py-3 px-6 ">{detail.detail}</td>
                  <td className="py-3 px-6 ">{detail.mechanic}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedRepairs;

