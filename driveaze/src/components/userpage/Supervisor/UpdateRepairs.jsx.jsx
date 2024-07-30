import React, { useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const UpdateRepairs = () => {
  const { numberPlate } = useParams();
  const job = {
    vehicleNumber: numberPlate,
    jobStartedDate: "2022-01-10",
    assignedSupervisor: "Kasun Perera",
    status: "Ongoing",
    service: "Full service",
  };

  const initialJobDetails = [
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

  const [jobDetails, setJobDetails] = useState(initialJobDetails);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState(null);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const newJobDetails = jobDetails.filter((_, i) => i !== index);
      setJobDetails(newJobDetails);
    }
  };

  const handleUpdate = (index) => {
    setCurrentDetail({ ...jobDetails[index], index });
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    const updatedJobDetails = jobDetails.map((detail, index) =>
      index === currentDetail.index ? currentDetail : detail
    );
    setJobDetails(updatedJobDetails);
    setIsPopupOpen(false);
    setCurrentDetail(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Details for {numberPlate}
        </h3>
        <a
          href="/createnewjob"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Completed
      </a>
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
                <strong>Service Request(Details Given by Customer ):</strong> {job.service}
              </p>
            </div>
          </div>
        </div>
        <h4 className="text-gray-800 text-lg font-bold mb-4">Job Details</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">
                  Date
                </th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">
                  Detail
                </th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">
                  Mechanic
                </th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {jobDetails.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 pl-8">{detail.date}</td>
                  <td className="py-4 pl-8">{detail.detail}</td>
                  <td className="py-4 pl-8">{detail.mechanic}</td>
                  <td className="text-right whitespace-nowrap flex gap-2 py-2">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="py-2 px-3 font-medium text-white bg-green-600 hover:bg-green-500 duration-150 rounded-lg flex items-center justify-center"
                    >
                      <FaRegEdit className="text-lg text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="py-2 px-3 font-medium text-white bg-red-600 hover:bg-red-500 duration-150 rounded-lg flex items-center justify-center"
                    >
                      <FaRegTrashAlt className="text-lg text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Update Job Detail</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                value={currentDetail.date}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, date: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Detail</label>
              <input
                type="text"
                value={currentDetail.detail}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, detail: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mechanic</label>
              <input
                type="text"
                value={currentDetail.mechanic}
                onChange={(e) =>
                  setCurrentDetail({ ...currentDetail, mechanic: e.target.value })
                }
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="py-2 px-4 bg-gray-500 hover:bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateRepairs;
