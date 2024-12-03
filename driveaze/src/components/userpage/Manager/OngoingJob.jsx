import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SupervisorService from '../../service/SupervisorService';
import { FaSearch } from 'react-icons/fa';

const OngoingJob = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await SupervisorService.getJobs(token);
        
        // Map complex response structure to component needs
        const vehicleJobs = response.details.filter(([job]) => job.jobStatus === 0).map(([job, vehicle, serviceType, vehicleModel, vehicleBrand ]) => ({
          icon: "https://media.istockphoto.com/id/1431411681/vector/car-front-icon-silhouette-symbol-car-sign-in-linear-style.jpg?s=612x612&w=0&k=20&c=5ZBdsn3X507MKNQqm2dtSo0HZ1D5ATMfvPn1UAbqwOY=",
          numberPlate: vehicle.vehicleNo,
          vehicleBrandModel: `${vehicleBrand.brandName} ${vehicleModel.modelName}`,
          jobDetails: job,
          vehicle: vehicle,
          serviceTypeDetails: serviceType,
        }));

        setJobs(vehicleJobs);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs: {error.message}</div>;

  return (
    <div className="mt-14 max-w-screen-xl mx-auto px-4 md:px-8">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Registered Vehicles
        </h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-3">
        {/* Search Bar */}
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
      <ul className="mt-4 divide-y">
        {jobs
          .filter((item) =>
            item.numberPlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.vehicleBrandModel.toLowerCase().includes(searchTerm.toLowerCase()) 
          )
          .map((item, idx) => (
            <li key={idx} className="py-5 flex items-start justify-between">
              <div className="flex gap-3">
                <img src={item.icon} className="flex-none w-12 h-12 rounded-full" alt="Vehicle" />
                <div>
                  <span className="block text-sm text-gray-700 font-semibold">{item.numberPlate}</span>
                  <span className="block text-sm text-gray-600">{item.vehicleBrandModel}</span>
                  <span className="block text-sm text-gray-500">
                    Service: {item.serviceTypeDetails.serviceName}
                  </span>
                  <span className="block text-sm text-gray-500">
                    Started: {item.jobDetails.startedDate} {item.jobDetails.startTime}
                  </span>
                </div>
              </div>
              <Link
                to={`/viewongoingjobs/${item.numberPlate}`}
                state={{ 
                  jobDetails: item.jobDetails, 
                  vehicle: item.vehicle,
                  serviceTypeDetails: item.serviceTypeDetails,
                  vehicleBrandModel: item.vehicleBrandModel
                }}
                className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 mb-2"
              >
                View
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default OngoingJob;