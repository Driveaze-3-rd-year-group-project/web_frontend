import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';


function EditVehicle() {
  const { vehicleId } = useParams(); // Get vehicleId from the route
  const navigate = useNavigate();
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [error, setError] = useState('');
  const [contactError, setContactError] = useState('');

  const [vehicleData, setVehicleData] = useState({
    vehicleNo: '',
    vehicleBrandId: '',
    vehicleBrandName: '', // New field for displaying brand name
    vehicleModelId: '',
    vehicleModelName: '', // New field for displaying model name
    vehicleMilage: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
  });

  useEffect(() => {
    fetchVehicleDataById(vehicleId); 
  }, [vehicleId]);

  const fetchVehicleDataById = async (vehicleId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getCustomerVehicleById(vehicleId, token);
      // console.log(response);
      console.log(response.customerVehicle);
      const fetchedVehicle = response.customerVehicle;
      setVehicleData({
        vehicleNo: fetchedVehicle.vehicleNo,
        vehicleBrandId: fetchedVehicle.vehicleBrandId,
        vehicleBrandName: '', // New field for displaying brand name
        vehicleModelId: fetchedVehicle.vehicleModelId,
        vehicleModelName: '', // New field for displaying model name
        vehicleMilage: fetchedVehicle.vehicleMilage,
        ownerName: fetchedVehicle.ownerName,
        ownerPhone: fetchedVehicle.ownerPhone,
        ownerEmail: fetchedVehicle.ownerEmail,
      });
      const vehicle = await UserService.getCustomerVehicleById(fetchedVehicle.vehicleId, token);
      // console.log("Fetched Vehicle:", vehicle);
      handleVehicleSelect(vehicle.customerVehicle);

    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

   const handleVehicleSelect = async (vehicle) => {
    console.log('Selected vehicle:', vehicle);

    const token = localStorage.getItem('token');
    const vehicleBrandId  = vehicle.vehicleBrandId;
    const brandResponse = await UserService.getVehicleBrandById(vehicleBrandId, token);
    const vehicleBrand = brandResponse.vehicleBrand.brandName;

    const vehicleModelId  = vehicle.vehicleModelId;
    const modelResponse = await UserService.getVehicleModelById(vehicleModelId, token);
    const vehicleModel = modelResponse.vehicleModel.modelName;

    setSelectedId(vehicleBrandId); // Set the selected brand ID
    
    setVehicleData((prev) => ({
      ...prev,
      ...vehicle,
      vehicleBrandName: vehicleBrand,
      vehicleModelName: vehicleModel,
    }));

    console.log('Selected vehicle data:', vehicleData);
    
    setSelectedVehicle(vehicleData); // Set the selected vehicle

    // setVehicleSuggestions([]); // Clear the suggestions dropdown
  };

  // Fetch Vehicle Brands on Component Mount
  useEffect(() => {
    const fetchVehicleBrands = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllVehicleBrands(token);
        // console.log('Fetched vehicle brands:', response.vehicleBrandList);
        setVehicleBrands(response.vehicleBrandList || []);
      } catch (err) {
        console.error(err);
        setVehicleBrands([]);
      }
    };

    fetchVehicleBrands();
  }, []);

  // Fetch Vehicle Models when a brand is selected
  useEffect(() => {
    const fetchVehicleModels = async () => {
      if (!selectedId) {
        setVehicleModels([]);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllVehicleModelsWithVehicleBrandId(selectedId, token);
        // console.log('Fetched vehicle models:', response.vehicleModelList);
        setVehicleModels(response.vehicleModelList || []);
      } catch (err) {
        console.error(err);
        setVehicleModels([]);
      }
    };

    fetchVehicleModels();
  }, [selectedId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'vehicleBrand') {
      const selectedBrand = vehicleBrands.find((brand) => brand.brandName === value);
      // console.log('Selected vehicle brand:', selectedBrand);
      setSelectedId(selectedBrand ? selectedBrand.brandId : ''); // Set selected brand ID
      setVehicleModels([]); // Clear models when the brand changes
      setVehicleData((prev) => ({
        ...prev,
        vehicleBrandId: value,
        vehicleModelId: '', // Reset model
      }));
    } else if (name === 'vehicleModel' && !selectedId) {
      setError('Please select a vehicle brand first.');
      setTimeout(() => setError(''), 3000);
    } else {
      setVehicleData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'ownerPhone') {
      const phonePattern = /^\d{10}$/;
      setContactError(!phonePattern.test(value) ? 'Invalid contact number' : '');
    }
  
    // Update the state for ownerPhone
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contactError) {
      toast.error('Please fix the contact number error before submitting.');
      return;
    }

    // Get current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const registeredDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

    console.log('Current date:', registeredDate); 

    const registeredTime = currentDate.toLocaleTimeString('en-GB'); // Format as HH:mm:ss

     // Set jobData with the current time and date
     const updatedVehicleData = {
      ...vehicleData,
      registeredDate,
      registeredTime,
      vehicleBrandName: undefined, // Exclude if unnecessary
      vehicleModelName: undefined, // Exclude if unnecessary
    };

    console.log('Submitting form with updatedJobData:', updatedVehicleData);

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.updateCustomerVehicle(vehicleId, updatedVehicleData, token);
      console.log('response:', res.message);
      if (res.statusCode === 200) {
        // alert('Vehicle Details added successfully');
        toast.success('Vehicle Details added successfully');
        setTimeout(() => {
          navigate('/vehiclemanagement');
        }, 1000);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Add Vehicle Details</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNo"
                value={vehicleData.vehicleNo}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Enter Vehicle Number"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
             
              <div>
                <label className="font-medium">Vehicle Brand</label>
                <select
                  name="vehicleBrand"
                  value={vehicleData.vehicleBrandName}
                  onChange={(e) => {
                    const selectedBrand = vehicleBrands.find(
                      (brand) => brand.brandName === e.target.value
                    );
                    console.log('Selected vehicle brand:', selectedBrand);
                    setVehicleData((prev) => ({
                      ...prev,
                      vehicleBrandId: selectedBrand ? selectedBrand.brandId : '',
                      vehicleBrandName: selectedBrand ? selectedBrand.brandName : '',
                      vehicleModelId: '', // Clear model selection
                      vehicleModelName: '', // Clear model name
                    }));
                    setSelectedId(selectedBrand ? selectedBrand.brandId : '');
                  }}
                  className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  required
                >
                  <option value="" disabled hidden>
                    Select a Brand
                  </option>
                  {vehicleBrands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <select
                  name="vehicleModel"
                  value={vehicleData.vehicleModelName}
                  onChange={(e) => {
                    const selectedModel = vehicleModels.find(
                      (model) => model.modelName === e.target.value
                    );
                    console.log('Selected vehicle model:', selectedModel);
                    setVehicleData((prev) => ({
                      ...prev,
                      vehicleModelId: selectedModel ? selectedModel.modelId : '',
                      vehicleModelName: selectedModel ? selectedModel.modelName : '',
                    }));
                  }}
                  className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  required
                  disabled={!selectedId} // Disable the dropdown if no brand is selected
                >
                  <option value="" disabled hidden>
                    {selectedId ? 'Select a Model' : 'First select a Vehicle Brand'}
                  </option>
                  {vehicleModels.length > 0 ? (
                    vehicleModels.map((model) => (
                      <option key={model.modelId} value={model.modelName}>
                        {model.modelName}
                      </option>
                    ))
                  ) : (
                    selectedId && (
                      <option value="" disabled>
                        No Vehicle Models Available
                      </option>
                    )
                  )}
                </select>
              </div>

            </div>
            <div>
              <label className="font-medium">Vehicle Milage(km)</label>
              <input
                type="number"
                name="vehicleMilage"
                value={vehicleData.vehicleMilage}
                onChange={handleInputChange}
                required
                className="w-full pl-4 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg  appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                placeholder="Enter Milage in km"
              />
            </div>
            <div>
              <label className="font-medium">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={vehicleData.ownerName}
                onChange={handleInputChange}
                required
                className="w-full pl-4 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Enter Owner Name"
              />
            </div>
            <div>
              <label className="font-medium">Owner Contact Number</label>
              <input
                type="text"
                name="ownerPhone"
                value={vehicleData.ownerPhone}
                onChange={handleChange}
                required
                className="w-full pl-4 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="0715657589 (Enter without spaces)"
              />
              {contactError && <p className="text-red-500 text-sm mt-1">{contactError}</p>}
            </div>
            <div>
              <label className="font-medium">Owner Email(Optional)</label>
              <input
                type="email"
                name="ownerEmail"
                value={vehicleData.ownerEmail}
                onChange={handleInputChange}
                className="w-full pl-4 pr-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Enter Email"
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/vehiclemanagement"
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

export default EditVehicle;
