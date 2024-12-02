import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SupervisorService from '../../service/SupervisorService';

const CompletedJobs = () => {
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
        const vehicleJobs = response.details.filter(([job]) => job.jobStatus === 1).map(([job, vehicle, serviceType, vehicleModel, vehicleBrand]) => ({
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
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Completed Repairs
          </h3>
        </div>
        <div className="mt-3 md:mt-0 flex items-center">
          <form
            onSubmit={(e) => e.preventDefault()} 
            className="max-w-md px-4 mx-auto mt-12"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search jobs..."
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <ul className="mt-12 divide-y">
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
                to={`/completedrepairs/${item.numberPlate}`}
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

export default CompletedJobs;
