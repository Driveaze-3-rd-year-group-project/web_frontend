import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../service/UserService";

const AddVehicleBrand = () => {
  const [vehicleBrand, setVehicleBrand] = useState({ 
    brandName: "", 
    brandImage: "",
    registeredDate: new Date().toISOString() // Add current date in ISO format
  });

  const validateFile = (file) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }
    
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size should not exceed 5MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileInput = document.getElementById('file');
      const file = fileInput?.files[0];
      
      try {
        validateFile(file);
      } catch (error) {
        toast.error(error.message);
        return;
      }
      
      const token = localStorage.getItem('token');
      
      // Create a new object with only the fields that match your DTO
      const brandData = {
        brandName: vehicleBrand.brandName,
        brandImage: vehicleBrand.brandImage,
        registeredDate: vehicleBrand.registeredDate
      };
      
      const res = await UserService.addNewVehicleBrand(brandData, file, token);

      if (res.statusCode === 200) {
        toast.success("Vehicle Brand Added successfully!");
        setTimeout(() => {
          closeModal();
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.message || 'Failed to Add Vehicle Brand');
      }
    } catch (error) {
      console.error("Error adding Vehicle Brand:", error);
      const errorMessage = error.response?.data?.message || "Error adding Vehicle Brand!";
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleBrand(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Vehicle Brand</h3>
      </div>

      <div className="mt-12 max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Brand Image</label>
            <div className="mt-2 w-full h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
              <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                <div className="w-16 h-16 mx-auto text-indigo-600">
                  <FaCloudUploadAlt className="text-4xl" />
                </div>
                <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                  Click to <span className="font-medium text-indigo-600">Upload your picture</span> or drag and drop your file here
                </p>
              </label>
              <input 
                id="file" 
                type="file" 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Vehicle Brand Name</label>
            <input
              type="text"
              value={vehicleBrand.brandName}
              name="brandName"
              onChange={handleChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Vehicle Brand"
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <a
              href="/vehiclemodelbrand"
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

export default AddVehicleBrand;


