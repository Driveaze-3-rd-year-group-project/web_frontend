import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt  } from 'react-icons/fa';
import UserService from "../../service/UserService";

const JobManagement = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  // const fetchJobs = async () => {
  //   try {
  //     const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  //     const response = await UserService.getAllJobs(token);
  
  //     console.log('Fetched jobs:', response); // Log the response for debugging
  
  //     // Extract jobRegistryList from the response
  //     const jobsData = response?.jobRegistryList || [];
      
  //     setJobs(jobsData); // Ensure it's an array
  //   } catch (error) {
  //     console.error('Error fetching jobs:', error);
  //     setJobs([]); // Set an empty array if there's an error
  //   }
  // };
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getAllJobs(token);
  
      console.log('Fetched jobs:', response);
  
      const jobsData = response?.jobRegistryList || [];
  
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
  
      // Sort jobs by date and time (latest first)
      const sortedJobs = updatedJobs.sort((a, b) => {
        const dateTimeA = new Date(`${a.startedDate}T${a.startTime}`);
        const dateTimeB = new Date(`${b.startedDate}T${b.startTime}`);
        return dateTimeB - dateTimeA; // Descending order
      });
  
      setJobs(sortedJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    }
  };
  
  const deleteJobs = async (jobId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this job?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteJob(jobId, token);
        fetchJobs();
      }
    } catch (error) {
      console.error('Error deleting Job:', error);
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
              <th className="py-3 px-6">Job ID</th>
              <th className="py-3 px-6">Vehicle Number</th>
              <th className="py-3 px-6">Vehicle Brand&Model</th>
              <th className="py-3 px-6">Job Started Date</th>
              <th className="py-3 px-6">Assigned Supervisor</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map(job => (
                <tr key={job.jobId}>
                  <td className="px-6 py-4 whitespace-nowrap">{job.jobId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.vehicleNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.vehicleBrand}-{job.vehicleModel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.startedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.supervisorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusStyle(job.jobStatus === 0 ? "Ongoing" : "Completed")}>
                      {job.jobStatus === 0 ? "Ongoing" : "Completed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between items-center space-x-2 relative">
                      {/* Info Icon with Tooltip */}
                      <div className="relative group">
                        <a href={`/jobdetails/${job.jobId}`} className="text-green-500 hover:text-green-700 text-xl">
                          <FaInfoCircle />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View Job
                        </div>
                      </div>

                      {/* Edit Icon with Tooltip */}
                      <div className="relative group">
                        <a href={`/update-job/${job.jobId}`} className="text-indigo-600 hover:text-indigo-800 text-xl">
                          <FaEdit />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Edit Job
                        </div>
                      </div>

                      {/* Delete Icon with Tooltip */}
                      <div className="relative group">
                        <a onClick={() => deleteJobs(job.jobId)} className="text-red-500 hover:text-red-800 text-xl">
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
                <td colSpan="6" className="text-center py-4">No jobs found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default JobManagement;
