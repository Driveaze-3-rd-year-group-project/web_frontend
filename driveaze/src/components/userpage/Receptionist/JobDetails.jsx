import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
import SupervisorService from '../../service/SupervisorService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function JobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get the job id from the URL

  const [jobEntries, setJobEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); 

  const [jobData, setJobData] = useState({
    vehicleNumber: '',
    vehicleBrand: '',
    vehicleModel: '',
    startedDate: '',
    startTime: '',
    jobDescription: '',
    serviceTypeName: '',
    vehicleMilage: '',
    supervisorName: '',
    jobStatus: '',
  });

  useEffect(() => {
    fetchJobDataById(jobId); // Pass the userId to fetchUserDataById
    fetchJobEntries(jobId, currentPage);
  }, [jobId]);

  useEffect(() => {
    fetchJobEntries(jobId, currentPage);
  }, [jobId, currentPage]);

  const fetchJobDataById = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getJobById(jobId, token); // Pass userId to getUserById
    
      const fetchedJob = response.jobRegistry;

      const vehicle = await UserService.getCustomerVehicleById(fetchedJob.vehicleId, token);
      console.log('Fetched vehicle:', vehicle);

      const vehicleBrandId = vehicle.customerVehicle.vehicleBrandId;
      const vehicleModelId = vehicle.customerVehicle.vehicleModelId;

      const vehicleBrandResponse = await UserService.getVehicleBrandById(vehicleBrandId, token);
      const vehicleBrand = vehicleBrandResponse?.vehicleBrand?.brandName || "Unknown Brand";

      const vehicleModelResponse = await UserService.getVehicleModelById(vehicleModelId, token);
      const vehicleModel = vehicleModelResponse?.vehicleModel?.modelName || "Unknown Model";

      const supervisor = await UserService.getUserById(fetchedJob.supervisorId, token);
      
      const serviceType = await UserService.getServiceTypeById(fetchedJob.serviceTypeId, token);


      setJobData({
        vehicleNumber: vehicle.customerVehicle.vehicleNo,
        vehicleBrand: vehicleBrand,
        vehicleModel: vehicleModel,
        startedDate: fetchedJob.startedDate,
        startTime: fetchedJob.startTime,
        jobDescription: fetchedJob.jobDescription,
        serviceTypeName: serviceType.serviceTypes.serviceName,
        vehicleMilage: fetchedJob.vehicleMilage,
        supervisorName: supervisor.ourUsers.name,
        jobStatus: fetchedJob.jobStatus,
      });

    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const fetchJobEntries = async (jobId, page) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await SupervisorService.getAllJobsEntriesWithPagination(jobId, page, token);
      // console.log('Fetched paginated job Entries:', response);
  
      // Format the job entries directly from the response.content array
      const formattedEntries = (response?.content || []).map((jobEntry) => {
        return {
          date: jobEntry.entryDate,
          time: jobEntry.time,
          details: jobEntry.details,
          technicianId: jobEntry.technicianId,
        };
      });
  
      setJobEntries(formattedEntries); // Update state with formatted job entries
      setTotalPages(response?.totalPages || 1); // Set total pages for pagination
    } catch (error) {
      console.error('Error fetching job Entries:', error);
      setJobEntries([]); // Reset job entries on error
    }
  };
  

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to generate page numbers with "..." where necessary
  const getPages = (totalPages, currentPage) => {
    const pages = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers including "..."
    const half = Math.floor(maxPagesToShow / 2);

    // If total pages are less than or equal to maxPagesToShow, show all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Calculate start and end page indices around currentPage
    let startPage = Math.max(0, currentPage - half);
    let endPage = Math.min(totalPages - 1, currentPage + half);

    // Adjust start and end to ensure maxPagesToShow pages are displayed
    if (currentPage - half < 0) {
      endPage = Math.min(totalPages - 1, endPage + (half - currentPage));
    } else if (currentPage + half >= totalPages) {
      startPage = Math.max(0, startPage - (currentPage + half - totalPages + 1));
    }

    // Add the first page and "..." if there's a gap
    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push("...");
      }
    }

    // Add pages in the current range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add "..." and the last page if there's a gap
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages - 1);
    }

    return pages;
  };

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
                <strong>Vehicle Number:</strong> {jobData.vehicleNumber}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Brand:</strong> {jobData.vehicleBrand}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Model:</strong> {jobData.vehicleModel}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Milage(As at Service Date):</strong> {jobData.vehicleMilage}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    jobData.jobStatus === 0
                      ? "text-orange-600" // Ongoing
                      : "text-green-600"  // Completed
                  }
                >
                  {jobData.jobStatus === 0 ? "Ongoing" : "Completed"}
                </span>
              </p>
              
              
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Job Started Date:</strong> {jobData.startedDate}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Job Started Time:</strong> {jobData.startTime}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Assigned Supervisor:</strong> {jobData.supervisorName}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Service Type:</strong> {jobData.serviceTypeName}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Customer Request:</strong>{" "}
                {jobData.jobDescription}
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
                  Time
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Service/Repair Details
                </th>
                <th className="py-3 px-6 text-gray-600 font-medium text-left">
                  Technician Name
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {Array.isArray(jobEntries) && jobEntries.length > 0 ? (
                jobEntries.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-3 px-6">{entry.date}</td>
                    <td className="py-3 px-6">{entry.time}</td>
                    <td className="py-3 px-6">{entry.details}</td>
                    <td className="py-3 px-6">{`Technician ${entry.technicianId}`}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No job Details Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
          <div className="flex items-center justify-between text-sm text-gray-600 font-medium mt-4">
            <button
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded-lg duration-150 hover:text-indigo-600 flex items-center gap-x-2 ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              <FaArrowLeft />
              Previous
            </button>
            {/* Page Numbers */}
            <div>
              <ul className="flex items-center gap-1">
                {getPages(totalPages, currentPage).map((item, idx) => (
                  <li key={idx} className="text-sm">
                    {item === "..." ? (
                      <div className="px-3 py-2">...</div>
                    ) : (
                      <a
                        onClick={() => handlePageChange(item)}
                        aria-current={currentPage === item ? "page" : undefined}
                        className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                          currentPage === item ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                        }`}
                      >
                        {item + 1} {/* Display 1-based page index */}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <button
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded-lg duration-150 hover:text-indigo-600 flex items-center gap-x-2 ${
                currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
            >
              Next
              <FaArrowRight />
            </button>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </div>
    
  );
}

export default JobDetails