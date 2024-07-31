import React, { useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaPlus, FaTimes } from "react-icons/fa";
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
  const [currentDetail, setCurrentDetail] = useState({ date: '', detail: '', mechanic: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [popupType, setPopupType] = useState('');

  const openPopup = (type, index = null) => {
    if (type === 'update' && index !== null) {
      setCurrentDetail(jobDetails[index]);
      setEditingIndex(index);
    } else {
      setCurrentDetail({ date: '', detail: '', mechanic: '' });
    }
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentDetail({ date: '', detail: '', mechanic: '' });
    setEditingIndex(null);
  };

  const handleSave = () => {
    const updatedItems = [...jobDetails];
    if (popupType === 'update') {
      updatedItems[editingIndex] = currentDetail;
    } else {
      updatedItems.push(currentDetail);
    }
    setJobDetails(updatedItems);
    closePopup();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const updatedItems = [...jobDetails];
      updatedItems.splice(index, 1);
      setJobDetails(updatedItems);
    }
  };
  const handleUpdate = (index) => {
    setCurrentDetail(jobDetails[index]);
    setEditingIndex(index);
    setPopupType('update');
    setIsPopupOpen(true);
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
      <div className="">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Number:</strong> {job.vehicleNumber}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Job Started Date:</strong> {job.jobStartedDate}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Assigned Supervisor:</strong> {job.assignedSupervisor}
              </p>
            </div>
            <div>
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
                <strong>Service Request (Details Given by Customer):</strong> {job.service}
              </p>
            </div>
          </div>
        </div>
        <div>
        
        <div className="mt-6 md:mt-0 flex justify-end">
          <button
            onClick={() => openPopup('add')}
            className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Add Jobs
          </button>
          
        </div>
    
        </div>
        <div className="overflow-x-auto pt-6">
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center pb-3 relative">
              <h3 className="text-indigo-600 text-xl font-semibold">
                {popupType === 'update' ? 'Update Job Detail' : 'Add New Job Detail'}
              </h3>
              <button 
                onClick={closePopup} 
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }} className="space-y-5">
              <div>
                <label className="font-medium">Date</label>
                <input
                  type="date"
                  value={currentDetail.date}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, date: e.target.value })}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Detail</label>
                <input
                  type="text"
                  value={currentDetail.detail}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, detail: e.target.value })}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Mechanic</label>
                <input
                  type="text"
                  value={currentDetail.mechanic}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, mechanic: e.target.value })}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={closePopup}
                  className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
                >
                  {popupType === 'update' ? 'Save Changes' : 'Add Detail'}
                </button>    
              </div>
            </form>
          </div>
        </div>
      )}
    </div>  
  );
};

export default UpdateRepairs;
