import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from "../../service/UserService";
import Swal from 'sweetalert2';

const JobManagement = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);


  const fetchJobs = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllJobsWithPagination(page, token);

      console.log('Fetched paginated jobs:', response);
  

      // Assuming the response includes 'content' for jobs and 'totalPages' for pagination info
      const jobsData = response?.content || [];

      // Fetch supervisor names and vehicle details and append to job data
      const updatedJobs = await Promise.all(
        jobsData.map(async (job) => {
          try {
            // Fetch supervisor name
            const supervisorResponse = await UserService.getUserById(job.supervisorId, token);
            const supervisorName = supervisorResponse?.ourUsers?.name || "Unknown Supervisor";
  
            // Fetch vehicle details
            const vehicleResponse = await UserService.getCustomerVehicleById(job.vehicleId, token);
            const vehicleData = vehicleResponse?.customerVehicle || {};
            const { vehicleNo, vehicleBrand, vehicleModel } = vehicleData;
  
            return {
              ...job,
              supervisorName,
              vehicleNo,
              vehicleBrand,
              vehicleModel,
            };
          } catch (error) {
            console.error(`Error fetching details for job ID ${job.jobId}:`, error);
            return {
              ...job,
              supervisorName: "Unknown Supervisor",
              vehicleNo: "Unknown Vehicle",
              vehicleBrand: "Unknown Brand",
              vehicleModel: "Unknown Model",
            };
          }
        })
      );


      setJobs(updatedJobs);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      onPageChange(page); 
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
  
  
  const deleteJobs = async (jobId) => {
    try {
        // Show the confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this job?!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        // If confirmed, delete the job and fetch the updated list of jobs
        if (result.isConfirmed) {
            const token = localStorage.getItem('token');
            await UserService.deleteJob(jobId, token);
            fetchJobs(currentPage);
        }
    } catch (error) {
        console.error('Error deleting job:', error);
    }
};

  

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusStyle = (status) => {
    return status === "Completed" ? "font-medium text-green-500" : "font-medium text-yellow-500";
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Job Management</h3>
      </div>

      <div className="flex justify-between items-center mb-3">
        {/* Left Section */}
        <div className="flex space-x-4">
          {/* Dropdown */}
          <div className="flex flex-col">
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

          {/* Search Input */}
          <div className="flex flex-col">
            <form onSubmit={(e) => e.preventDefault()} className="flex">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* Search Icon */}
                <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <a
          href="/create-job"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Create New Job
        </a>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg">
        <table className="w-full table-auto text-sm text-left overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Job ID</th>
              <th className="py-3 px-6">Vehicle Number</th>
              <th className="py-3 px-6">Vehicle Brand & Model</th>
              <th className="py-3 px-6">Job Started Date</th>
              <th className="py-3 px-6">Assigned Supervisor</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.jobId}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.jobId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.vehicleNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.vehicleBrand}-{job.vehicleModel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.startedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.supervisorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={getStatusStyle(
                        job.jobStatus === 0 ? "Ongoing" : "Completed"
                      )}
                    >
                      {job.jobStatus === 0 ? "Ongoing" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between items-center space-x-2 relative">
                      {/* Info Icon with Tooltip */}
                      <div className="relative group">
                        <a
                          href={`/jobdetails/${job.jobId}`}
                          className="text-green-500 hover:text-green-700 text-xl"
                        >
                          <FaInfoCircle />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Job
                        </div>
                      </div>

                      {/* Edit Icon with Tooltip */}
                      <div className="relative group">
                        <a
                          href={`/update-job/${job.jobId}`}
                          className="text-indigo-600 hover:text-indigo-800 text-xl"
                        >
                          <FaEdit />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Edit Job
                        </div>
                      </div>

                      {/* Delete Icon with Tooltip */}
                      <div className="relative group">
                        <a
                          onClick={() => deleteJobs(job.jobId)}
                          className="text-red-500 hover:text-red-800 text-xl"
                        >
                          <FaRegTrashAlt />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete Job
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No jobs found
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


// {/* //pagination */}
// <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
// <div className="flex items-center justify-between sm:flex" aria-label="Pagination">
  // <button
  //   onClick={() => handlePageChange(currentPage - 1)}
  //   disabled={currentPage === 1}
  //   className={`px-4 py-2 border rounded-lg duration-150 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
  // >
  //   <FaArrowLeft /> Previous
  // </button>

//   <ul className="flex items-center gap-1">
//     {Array.from({ length: pages }, (_, index) => (
//       <li key={index + 1}>
//         <button
//           onClick={() => handlePageChange(index + 1)}
//           className={`px-3 py-2 rounded-lg duration-150 hover:bg-indigo-50 ${currentPage === index + 1 ? 'bg-indigo-50 text-indigo-600 font-medium' : ''}`}
//         >
//           {index + 1}
//         </button>
//       </li>
//     ))}
//   </ul>

//   <button
//     onClick={() => handlePageChange(currentPage + 1)}
//     disabled={currentPage === pages}
//     className={`px-4 py-2 border rounded-lg duration-150 ${currentPage === pages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
//   >
//     Next <FaArrowRight />
//   </button>
// </div>

//     {/* On mobile version */}
//     <div className="flex items-center justify-between text-sm text-gray-600 font-medium sm:hidden">
//         <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Previous</a>
//         <div className="font-medium">
//             Page {currentPage} of {pages.length}
//         </div>
//         <a href="javascript:void(0)" className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50">Next</a>
//     </div>
// </div>
  );
};

export default JobManagement;
