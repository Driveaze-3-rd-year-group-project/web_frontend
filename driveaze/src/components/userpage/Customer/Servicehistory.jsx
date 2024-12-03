import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserService from '../../service/UserService';

const ServiceHistory = () =>{
  const { vehicleId } = useParams(); // Get the vehicle ID from the URL
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [totalPages, setTotalPages] = useState(1);
  const [vehicleData, setvehicleData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const [expandedRows, setExpandedRows] = useState({}); // State to track expanded rows

  useEffect(() => {
    fetchJobDataByVehicleId(currentPage); 
  }, [currentPage]);

  // console.log("Vehicle Data:", vehicleData);

  const fetchJobDataByVehicleId = async (page) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllJobsWithPaginationByVehicleId(vehicleId, page, token);
      console.log(response);

      const jobsData = response?.content || [];
      console.log("Jobs Data", jobsData);

      setJobs(jobsData);

      const vehicleData = await UserService.getCustomerVehicleById(vehicleId, token);
      // console.log('Fetched vehicle data:', vehicleData); 

      const vehicle = vehicleData.customerVehicle || {};
      // console.log('Vehicle:', vehicle);

      const brandResponse = await UserService.getVehicleBrandById(vehicle.vehicleBrandId , token);
      // console.log("Fetched Vehicle Brand", brandResponse); 

      const brandName = brandResponse.vehicleBrand.brandName || "Unknown Brand";

      const modelResponse = await UserService.getVehicleModelById(vehicle.vehicleModelId , token);
      // console.log("Fetched Vehicle Model", modelResponse); 

      const modelName = modelResponse.vehicleModel.modelName || "Unknown Model";

      setvehicleData({
        ...vehicle,
        brandName,
        modelName
      });

    } catch (error) {
      console.error('Error fetching Job data:', error);
    }
  };

  const getStatusStyle = (status) => {
    return status === "Completed" ? "font-medium text-green-500" : "font-medium text-yellow-500";
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

  const handleRowClick = (index) => {
    setExpandedRows({ ...expandedRows, [index]: !expandedRows[index] });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          {vehicleData.vehicleNo} <span className='flex flex-col font-normal'>{vehicleData.brandName} {vehicleData.modelName}</span>
        </h3>
       
        <a
          href="/myvehicles"
          className="px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
        >
          Back
        </a>

          
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Milage</strong> {vehicleData.vehicleMilage} KM
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Registered Date</strong> {vehicleData.registeredDate}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Registered Phone</strong> {vehicleData.ownerPhone}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Owner Name</strong> {vehicleData.ownerName}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="text-deepblue bg-dered font-bold py-3 px-6">Job ID</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Started Date</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Finished Date</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Job status</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6">Job Details</th>
                <th className="text-deepblue  bg-dered font-bold py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map((job, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{job.jobId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.startedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {job.jobStatus === 0 ? "Job not yet finished" : job.finishedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={getStatusStyle(
                          job.jobStatus === 0 ? "Ongoing" : "Completed"
                        )}
                      >
                        {job.jobStatus === 0 ? "Ongoing" : "Completed"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.jobDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleRowClick(idx)}
                    >
                      {expandedRows[idx] ? (
                        <FaAngleDoubleDown className="text-blue-600 text-2xl" />
                      ) : (
                        <FaAngleDoubleUp className="text-blue-600 text-2xl" />
                      )}
                    </button>


                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="border-1  border-black px-6 py-0 whitespace-nowrap">
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedRows[idx] ? 'max-h-40' : 'max-h-0'}`}>
                        <p className="text-deepblue font-bold  p-4">{job.content}</p>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <div className="flex justify-center">
                <span className="py-4 text-center">No Services found</span>
              </div>
            )}
            </tbody>
          </table>
        </div>
      </div>
      
      </div>
      {/* Pagination */}
      <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8 mb-8">
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
                      href="javascript:void(0)"
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
    </div>
  );
};

export default ServiceHistory;

