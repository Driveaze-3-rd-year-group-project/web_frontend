import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
function UpdateJob() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get jobId from the route
  const [vehicleSuggestions, setVehicleSuggestions] = useState([]);
  const [supervisorSuggestions, setSupervisorSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [error, setError] = useState('');
  const [jobData, setJobData] = useState({
    vehicleId: '',
    supervisorId: '',
    jobDescription: '',
    serviceTypeId: '',
    vehicleMilage: '',
  });

  // Fetch existing job data for editing
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getJobById(jobId, token);
        if (response.statusCode === 200) {
          const job = response.jobDetails; // Adjust based on your API response
          setJobData({
            vehicleId: job.vehicleId,
            supervisorId: job.supervisorId,
            jobDescription: job.jobDescription,
            serviceTypeId: job.serviceTypeId,
            vehicleMilage: job.vehicleMilage,
          });
          setSearchQuery(job.vehicleNumber || ''); // Populate vehicle search field
          setSearchQuery1(job.supervisorName || ''); // Populate supervisor search field
          setSelectedVehicle({
            vehicleId: job.vehicleId,
            vehicleNo: job.vehicleNumber,
            vehicleBrand: job.vehicleBrand,
            vehicleModel: job.vehicleModel,
          });
          setSelectedSupervisor({ id: job.supervisorId, name: job.supervisorName });
        } else {
          setError('Failed to fetch job details');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching job details');
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'vehicleId') {
      setSelectedVehicle(null);
      setJobData((prevJobData) => ({ ...prevJobData, vehicleId: '' }));
      setSearchQuery(value);

      if (value.length < 2) {
        setVehicleSuggestions([]);
      }
    } else {
      setJobData((prevJobData) => ({ ...prevJobData, [name]: value }));
    }
  };

  const handleInputChange1 = (e) => {
    const { value } = e.target;
    setSearchQuery1(value);
    setSelectedSupervisor(null);

    if (value.length < 2) {
      setSupervisorSuggestions([]);
    }
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      if (searchQuery.length >= 2 && !selectedVehicle) {
        try {
          const token = localStorage.getItem('token');
          const vehicles = await UserService.searchVehicles(searchQuery, token);
          setVehicleSuggestions(vehicles);
        } catch (err) {
          console.error(err);
          setVehicleSuggestions([]);
        }
      } else {
        setVehicleSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchVehicles, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, selectedVehicle]);

  const handleVehicleSelect = (vehicle) => {
    setJobData((prev) => ({ ...prev, vehicleId: vehicle.vehicleId }));
    setSearchQuery(vehicle.vehicleNo);
    setSelectedVehicle(vehicle);
    setVehicleSuggestions([]);
  };

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllServiceTypes(token);
        setServiceTypes(response.serviceTypesList || []);
      } catch (err) {
        console.error(err);
        setServiceTypes([]);
      }
    };

    fetchServiceTypes();
  }, []);

  useEffect(() => {
    const fetchSupervisors = async () => {
      if (searchQuery1.length >= 2 && !selectedSupervisor) {
        try {
          const token = localStorage.getItem('token');
          const supervisors = await UserService.searchSupervisors(searchQuery1, token);
          setSupervisorSuggestions(supervisors);
        } catch (err) {
          console.error(err);
          setSupervisorSuggestions([]);
        }
      } else {
        setSupervisorSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchSupervisors, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery1, selectedSupervisor]);

  const handleSupervisorSelect = (supervisor) => {
    setSearchQuery1(supervisor.name);
    setJobData((prev) => ({ ...prev, supervisorId: supervisor.id }));
    setSelectedSupervisor(supervisor);
    setSupervisorSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupervisor) {
      setError('Please select a supervisor from the suggestions list.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.updateJob(jobId, jobData, token);

      if (res.statusCode === 200) {
        alert('Job updated successfully');
        navigate('/jobmanagement');
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <h3 className="text-indigo-600 font-semibold text-center">Update Job</h3>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleId"
                value={searchQuery}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Enter the Vehicle Number"
              />
              
              {vehicleSuggestions.length > 0 ? (
                <ul className="absolute z-50 bg-white border mt-2 rounded-lg shadow w-full">
                  {vehicleSuggestions.map((vehicle) => (
                    <li
                      key={vehicle.id}
                      onClick={() => handleVehicleSelect(vehicle)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {vehicle.vehicleNo} - {vehicle.vehicleBrand} {vehicle.vehicleModel}
                    </li>
                  ))}
                </ul>
              ) : searchQuery.length >= 2 && !selectedVehicle ? (
                <ul className="absolute z-50 bg-white border mt-2 rounded-lg shadow w-full">
                  <li className="px-3 py-2 text-sm text-gray-500">
                    No vehicles found.{' '}
                    <a
                      href="/addvehicle"
                      className="text-indigo-600 hover:underline"
                    >
                      Register a new vehicle
                    </a>
                  </li>
                </ul>
              ) : null}
            </div>

            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Vehicle Brand</label>
                <input
                  type='text'
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  value={selectedVehicle?.vehicleBrand || ''}
                  readOnly
                  placeholder="Vehicle Brand"
                />
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <input
                  type='text'
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  value={selectedVehicle?.vehicleModel || ''}
                  readOnly
                  placeholder="Vehicle Model"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Vehicle Milage</label>
              <input
                type="number"
                name="vehicleMilage"
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                placeholder="Vehicle Milage(As shown in the Meter)"
              />
            </div>
            <div>
              <label className="font-medium">Service Type</label>
              <select
                name="serviceTypeId"
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
                value={jobData.serviceTypeId}
              >
                {/* Placeholder option */}
                <option value="" disabled>
                  Select a Service Type
                </option>

                {/* Service types fetched from state */}
                {serviceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.serviceName}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="relative">
              <label className="font-medium">Assigned Supervisor</label>
              <input
                type="text"
                name="supervisorId"
                value={searchQuery1}
                onChange={handleInputChange1}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Supervisor Name"
              />
              
              {supervisorSuggestions.length > 0 ? (
                <ul className="absolute z-50 bg-white border mt-2 rounded-lg shadow w-full">
                  {supervisorSuggestions.map((supervisor) => (
                    <li
                      key={supervisor.id}
                      onClick={() => handleSupervisorSelect(supervisor)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {supervisor.name}
                    </li>
                  ))}
                </ul>
              ) : searchQuery1.length >= 2 && !selectedSupervisor ? (
                <ul className="absolute z-50 bg-white border mt-2 rounded-lg shadow w-full">
                  <li className="px-3 py-2 text-sm text-gray-500">
                    No supervisors found.
                  </li>
                </ul>
              ) : null}
            </div>
            <div>
              <label className="font-medium">
                Service Request(Details given by Customer)
              </label>
              <textarea
                onChange={handleInputChange}
                name="jobDescription"
                value={jobData.jobDescription}
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/jobmanagement"
                className="w-2/5 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150 text-center"
              >
                Back
              </a>
              <button
                type="submit"
                className="w-2/5 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 text-center"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default UpdateJob;

