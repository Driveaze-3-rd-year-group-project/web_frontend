import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../service/UserService";

const AddService = () => {
  const navigate = useNavigate();
  const [ServiceTypes, setServiceTypes] = useState({
    serviceName: '', 
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const registeredDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

    console.log('Current date:', registeredDate); 

    const registeredTime = currentDate.toLocaleTimeString('en-GB'); // Format as HH:mm:ss

     // Set jobData with the current time and date
     const updatedServiceType = {
      ...ServiceTypes,
      registeredDate,
      registeredTime,
    };

    console.log('Submitting form with updatedJobData:', updatedServiceType);

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.addNewServiceType(updatedServiceType, token);
      console.log('response:', res.message);
      if (res.statusCode === 200) {
        toast.success('Service type added successfully');
        setTimeout(() => {
          navigate('/servicetypes');
        }, 500);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceTypes({
      ...ServiceTypes,
      [name]: value,
    });
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Service Type</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium">Service Type Name</label>
            <input
              type="text"
              value={ServiceTypes.serviceName}
              name="serviceName"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Service Type Name"
            />
          </div>
          <div className="flex items-center justify-between mt-6">
          <a
                href="/servicetypes"
                className="w-2/5 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150 text-center"
              >
                Back
              </a>
            <button
              type="submit"
              className="w-2/5 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 text-center"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AddService;
