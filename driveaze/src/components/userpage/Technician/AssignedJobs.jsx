import React, { useState, useEffect } from 'react';
import UserService from '../../service/UserService'; 

function AssignedJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulated fetch from API
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      const userProfile = await UserService.getYourProfile(token);
      const response = await UserService.getTechnicianEntries(userProfile.ourUsers.id,token); 
      // const response = {
      //   "statusCode": 200,
      //   "message": "Successful",
      //   "details": [
      //     // Simulated data structure based on your provided response
      //     [
      //       {
      //         "jobEntryId": 30,
      //         "entryDate": "2024-12-02",
      //         "manHours": 3,
      //         "details": "Vira",
      //         "jobRegistry": {
      //           "vehicleId": 1103,
      //         }
      //       },
      //       "Technician",
      //       "Toyota",
      //       "Axio",
      //       "CAX1323"
      //     ],
      //     // Add more job entries as needed...
      //   ],
      //   "requiresOTP": false
      // };

      if (response.statusCode === 200) {
        setJobs(response.details);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // Filter and sort jobs based on the search term and filter
  const filteredJobs = jobs
    .filter((job) => {
      const jobEntry = job[0];
      const vehicleNo = job[4]; // vehicle number is the 5th element in the array
      return (
        (filter === "all" || (filter === "completed" && jobEntry.jobRegistry.jobStatus === 1) || (filter === "pending" && jobEntry.jobRegistry.jobStatus === 0)) &&
        vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => a[0].jobEntryId - b[0].jobEntryId); // Sort by jobEntryId

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Completed Jobs</h3>
        <div className="mt-3 md:mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by Vehicle No"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Filter by Job Status</label>
          {/* <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">All Jobs</option>
            <option value="pending">Pending Jobs</option>
            <option value="completed">Completed Jobs</option>
          </select> */}
        </div>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Job Entry ID</th>
              <th className="py-3 px-6">Details</th>
              <th className="py-3 px-6">Entry Date</th>
              <th className="py-3 px-6">Vehicle No</th>
              < th className="py-3 px-6">Vehicle Model</th>
              {/* <th className="py-3 px-6">Man Hours</th> */}
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredJobs.map((job, index) => {
              const jobEntry = job[0];
              const vehicleBrandModel = `${job[2]} ${job[3]}`; // Combine brand and model
              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-3 px-6 whitespace-nowrap">{jobEntry.jobEntryId}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{jobEntry.details}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{jobEntry.entryDate}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{job[4]}</td>
                  <td className="py-3 px-6 whitespace-nowrap">{vehicleBrandModel}</td>
                  {/* <td className="py-3 px-6 whitespace-nowrap">{jobEntry.manHours}</td> */}
                  <td className="py-3 px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleViewDetails(jobEntry)}
                      className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-800">Job Details</h3>
            <div className="mt-4">
              <p className="font-medium">Job ID: {selectedJob.jobRegistry.jobId}</p>
              <p className="font-medium">Job Entry ID: {selectedJob.jobEntryId}</p>
              <p className="font-medium">Entry Date: {selectedJob.entryDate}</p>
              <p className="font-medium">Vehicle No: {selectedJob.jobRegistry.vehicleId}</p>
              <p className="font-medium">Details: {selectedJob.details}</p>
              <p className="font-medium">Man Hours: {selectedJob.manHours}</p>
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