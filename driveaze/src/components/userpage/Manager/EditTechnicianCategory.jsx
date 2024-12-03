import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';



const EditTechnicianCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [technicianCategoryData, setTechnicianCategoryData] = useState({
    technicianCategoryName: '',
    pricePerManHour: '',
  });

  useEffect(() => {
    fetchTechnicianCategoryDataById(categoryId); 
  }, [categoryId]);

  const fetchTechnicianCategoryDataById = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getTechnicianCategoryById(categoryId, token);
    //   console.log(response);

    //   console.log(response.technicianCategory);
      const fetchedCategory = response.technicianCategory;
      setTechnicianCategoryData({
        technicianCategoryName: fetchedCategory.technicianCategoryName,
        pricePerManHour: fetchedCategory.pricePerManHour,
      });

    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const updatedData = {
      ...technicianCategoryData,
      pricePerManHour: parseFloat(technicianCategoryData.pricePerManHour),
    };
    console.log('Submitting form with updatedData:', updatedData);

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.updateTechnicianCategory(categoryId, updatedData, token);

      if (res.statusCode === 200) {
        toast.success("Technician Category added successfully!");
        setTimeout(() => {
          navigate('/techniciancategory');
        }, 1000);
      } else {
        toast.error(res.message || "Failed to add technician category");
      }
    } catch (error) {
      toast.error("An error occurred while adding the technician category.");
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTechnicianCategoryData({
      ...technicianCategoryData,
      [name]: value,
    });
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      {/* Title */}
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Technician Category</h3>
      </div>

      {/* Form */}
      <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Technician Category Input */}
          <div>
            <label className="block font-medium">Technician Category</label>
            <input
              type="text"
              name="technicianCategoryName"
              value={technicianCategoryData.technicianCategoryName}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Technician Category"
            />
          </div>

          {/* Price per Man Hour Input */}
          <div>
            <label className="block font-medium">Price per Man Hour(LKR)</label>
            <input
              type="number"
              name="pricePerManHour"
              value={technicianCategoryData.pricePerManHour}
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Price per Man Hour"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <a
              href="/techniciancategory"
              className="w-2/5 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150 text-center"
            >
              Back
            </a>
            <button
              type="submit"
              className="w-2/5 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 text-center"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
    </div>
  );
};





export default EditTechnicianCategory;
