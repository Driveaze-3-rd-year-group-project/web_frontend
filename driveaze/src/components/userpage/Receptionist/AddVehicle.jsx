import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleService from '../../service/VehicleService';

function AddVehicle() {
  const navigate = useNavigate();
  const [error, setError] = useState('');


  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: '',
    vehicleBrand: '',
    vehicleModel: '',
    ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    registeredPhone: '',
  });

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevVehicleData) => ({
      ...prevVehicleData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const token = localStorage.getItem('token');
      const res = await VehicleService.saveCustomerVehicle(vehicleData, token);
      console.log(res);
      
      if (res.statusCode === 200) {
          alert('Vehicle Details added successfully');
          navigate("/vehiclemanagement");
      } else {
          setError(res.message);
      }
  } catch (error) {
      setError(error.message);
      setTimeout(() => {
          setError('');
      }, 5000);
  }
}

return (
  <main className="py-14">
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">
          Add Vehicle Details
        </h3>
      </div>
      <div className="mt-12 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Vehicle Number</label>
            <input
              type="text" 
              name="vehicleNumber" 
              value={vehicleData.vehicleNumber} 
              onChange={handleInputChange} 
              required
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder='Enter Vehicle Number'
            />
          </div>
          <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Vehicle Brand</label>
              <select 
                name="vehicleBrand"
                value={vehicleData.vehicleBrand}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
                defaultValue={""}
              >
                <option value="" disabled hidden>Select a Brand</option>
                <option value="Honda">Honda</option>
                <option value="Nissan">Nissan</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Vehicle Model</label>
              <select 
                name="vehicleModel"
                value={vehicleData.vehicleModel}
                onChange={handleInputChange}
                className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
                defaultValue={""}
              >
                <option value="" disabled hidden>Select a Model</option>
                <option value="Civic">Civic</option>
                <option value="Altima">Altima</option>
                <option value="Corolla">Corolla</option>
              </select>
            </div>
          </div>
          {/* <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
            <div>
              <label className="font-medium">Owner's First Name</label>
              <input
                type="text" 
                name="ownerFirstName" 
                value={vehicleData.ownerFirstName} 
                onChange={handleInputChange} 
                required
                className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder='Enter Owner First Name'
              />
            </div>
            <div>
              <label className="font-medium">Owner's Last Name</label>
              <input
                type="text" 
                name="ownerLastName" 
                value={vehicleData.ownerLastName} 
                onChange={handleInputChange} 
                required
                className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder='Enter Owner Last Name'
              />
            </div>
          </div>
          <div>
            <label className="font-medium">Owner's Email</label>
            <input
              type="email"
              name="ownerEmail" 
              value={vehicleData.ownerEmail} 
              onChange={handleInputChange} 
              required
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder='Enter Owner Email'
            />
          </div> */}
          <div>
            <label className="font-medium">Registered Phone No</label>
            <div className="relative mt-2">
              <input
                type="text"
                name="registeredPhone" 
                value={vehicleData.registeredPhone} 
                onChange={handleInputChange} 
                required
                className="w-full pl-4 pr-3 py-2 text-gray-800 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="071-5657589"
              />
            </div>
          </div>
          {/* <div>
            <label className="font-medium">Message</label>
            <textarea
              required
              className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            ></textarea>
          </div> */}
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
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  </main>
);
}

export default AddVehicle;

