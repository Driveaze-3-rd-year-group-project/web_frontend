import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

const AddTechnicianCategory = () => {
  const [technicianCategory, setTechnicianCategory] = useState("");
  const [pricePerManHour, setPricePerManHour] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    alert(
      `Technician Category: ${technicianCategory}, Price per Man Hour: ${pricePerManHour}`
    );
    setTechnicianCategory("");
    setPricePerManHour("");
  };

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      {/* Title */}
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Add Technician Category</h3>
      </div>

      {/* Form */}
      <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleAddCategory} className="space-y-5">
          {/* Technician Category Input */}
          <div>
            <label className="block font-medium">Technician Category</label>
            <input
              type="text"
              value={technicianCategory}
              onChange={(e) => setTechnicianCategory(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Technician Category"
            />
          </div>

          {/* Price per Man Hour Input */}
          <div>
            <label className="block font-medium">Price per Man Hour</label>
            <input
              type="number"
              value={pricePerManHour}
              onChange={(e) => setPricePerManHour(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Price per Man Hour"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <a
              href="/staffaccounts"
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
    </div>
  );
};

export default AddTechnicianCategory;
