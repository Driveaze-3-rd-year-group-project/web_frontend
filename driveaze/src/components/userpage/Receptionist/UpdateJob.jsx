import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function UpdateJob() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get jobId from the route
  const [vehicleSuggestions, setVehicleSuggestions] = useState([]);
  const [supervisorSuggestions, setSupervisorSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery1, setSearchQuery1] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [serviceTypes, setServiceTypes] = useState([]);
  const [vehicleMilage, setVehicleMilage] = useState('');
  const [error, setError] = useState('');
  
  const [jobData, setJobData] = useState({
    vehicleId: '',
    supervisorId: '',
    jobDescription: '',
    serviceTypeId: '',
    vehicleMilage: '',
  });

  useEffect(() => {
    fetchJobDataById(jobId); // Pass the userId to fetchUserDataById
  }, [jobId]);

  const fetchJobDataById = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getJobById(jobId, token); // Pass userId to getUserById
      // console.log(response);
      // console.log(response.jobRegistry);
      const fetchedJob = response.jobRegistry;
      setJobData({
        vehicleId: fetchedJob.vehicleId,
        supervisorId: fetchedJob.supervisorId,
        jobDescription: fetchedJob.jobDescription,
        serviceTypeId: fetchedJob.serviceTypeId,
        vehicleMilage: fetchedJob.vehicleMilage,
      });
      const vehicle = await UserService.getCustomerVehicleById(fetchedJob.vehicleId, token);
      // console.log("Fetched Vehicle:", vehicle);
      handleVehicleSelect(vehicle.customerVehicle);

      const supervisor = await UserService.getUserById(fetchedJob.supervisorId, token);
      // console.log("Fetched Supervisor:", supervisor);
      handleSupervisorSelect(supervisor.ourUsers);

      handleMilageChange({ target: { value: fetchedJob.vehicleMilage } });

    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setJobData((prev) => ({
      ...prev,
      vehicleId: vehicle.vehicleId, // Store only vehicleId in jobData
    }));
    setSearchQuery(vehicle.vehicleNo); // Set the vehicle number in the input field
    setSelectedVehicle(vehicle); // Set the selected vehicle
    setVehicleSuggestions([]); // Clear the suggestions dropdown
  };

  const handleSupervisorSelect = (supervisor) => {
    setSearchQuery1(supervisor.name);
    setJobData((prev) => ({ ...prev, supervisorId: supervisor.id }));
    setSelectedSupervisor(supervisor);
    setSupervisorSuggestions([]);
  };

  const handleMilageChange = (e) => {
    // console.log("In Handle Mi C.: ",e.target.value);
    const updatedMilage = e.target.value;
    setVehicleMilage(updatedMilage); // Update the input field
    setJobData((prev) => ({
      ...prev,
      vehicleMilage: updatedMilage, // Sync with jobData
    }));
  };

  useEffect(() => {
    if (selectedVehicle) {
      // Set the mileage from the selected vehicle
      setVehicleMilage(selectedVehicle.vehicleMilage || ''); // Default to an empty string if no mileage
      setJobData((prev) => ({
        ...prev,
        vehicleMilage: selectedVehicle.vehicleMilage || '', // Sync with jobData
      }));
    }
  }, [selectedVehicle]);

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

  const handleInputChange2 = (e) => {
    const selectedId = e.target.value;
    const selectedType = serviceTypes.find((type) => type.id === selectedId);
  
    setSelectedServiceType(selectedType ? selectedType.serviceName : '');
    setJobData((prev) => ({
      ...prev,
      serviceTypeId: selectedId, // Update the serviceTypeId in jobData
    }));
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      if (searchQuery.length >= 2 && !selectedVehicle) {
        try {
          const token = localStorage.getItem('token');
          const vehicles = await UserService.searchVehicles(searchQuery, token);
          console.log('Fetched vehicles:', vehicles);

          const updatedVehicles = await Promise.all(
            vehicles.map(async (vehicle) => {
              try {
                const vehicleBrandId = vehicle.vehicleBrandId;
                const vehicleModelId = vehicle.vehicleModelId;
    
                const vehicleBrandResponse = await UserService.getVehicleBrandById(vehicleBrandId, token);
                const vehicleBrand = vehicleBrandResponse?.vehicleBrand?.brandName || "Unknown Brand";
    
                const vehicleModelResponse = await UserService.getVehicleModelById(vehicleModelId, token);
                const vehicleModel = vehicleModelResponse?.vehicleModel?.modelName || "Unknown Model";
      
                return {
                  ...vehicle,
                  vehicleBrand,
                  vehicleModel,
                };
              } catch (error) {
                console.error(`Error fetching details for vehicle ID ${vehicle.vehicleId}:`, error);
                return {
                  ...vehicle,
                  vehicleBrand: "Unknown Brand",
                  vehicleModel: "Unknown Model",
                };
              }
            })
          );


          setVehicleSuggestions(updatedVehicles);
        } catch (error) {
          console.error(error);
          setVehicleSuggestions([]);
        }
      } else {
        setVehicleSuggestions([]);
      }
    };

    const debounceTimeout = setTimeout(fetchVehicles, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, selectedVehicle]);


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSupervisor) {
      setError('Please select a supervisor from the suggestions list.');
      toast.error('Supervisor not selected');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Job Data: ", jobData);
      const res = await UserService.updateJob(jobId, jobData, token);

      if (res.statusCode === 200) {
        toast.success("Job Updated successfully!");
        setTimeout(() => {
          navigate('/jobmanagement');
        }, 1000);
      } else {
        setError(res.message);
        toast.error(res.message || 'Failed to Update job');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error Updating job');
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
                onChange={handleMilageChange}
                value={vehicleMilage}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                placeholder="Vehicle Milage(As shown in the Meter)"
              />
            </div>
            <div>
              <label className="font-medium">Service Type</label>
              <select
                name="serviceTypeId"
                onChange={handleInputChange2}
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
                  <option key={type.id} value={type.serviceId}>
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </main>
  );
}

export default UpdateJob;

