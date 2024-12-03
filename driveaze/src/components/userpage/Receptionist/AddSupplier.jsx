import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

const AddSupplier = () => {
  const navigate = useNavigate();

  // private Long supplierId;
  // private String supplierEmail;
  // private String contactNumber;
  // private String supplierName;
  // private String address;
  // private String partsDescription;
  // private LocalDate registeredDate;

  const [supplierData, setsupplierData] = useState({
    supplierName: '',
    supplierEmail: '',
    contactNumber: '',
    address: '',
    partsDescription: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current date and time
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const registeredDate = `${year}-${month}-${day}`; // Format as YYYY-MM-DD

    console.log('Current date:', registeredDate); 

     // Set jobData with the current time and date
     const updatedSupplierData = {
      ...supplierData,
      registeredDate,
    };

    console.log('Submitting form with updatedJobData:', updatedSupplierData);

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.addNewSupplier(updatedSupplierData, token);
      console.log('response:', res.message);
      if (res.statusCode === 200) {
        // alert('Supplier Details added successfully');
        toast.success('Supplier Details added successfully');
        setTimeout(() => {
          navigate('/supplierpayments');
        }, 1000);
      } else {
        // setError(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      // setError(error.message);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setsupplierData({
      ...supplierData,
      [name]: value
    });
  };

  return (
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Create New Supplier</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={supplierData.supplierName}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="supplierEmail"
                value={supplierData.supplierEmail}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={supplierData.contactNumber}
                onChange={handleInputChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Address</label>
              <textarea
                required
                name="address"
                value={supplierData.address}
                onChange={handleInputChange}
                className="w-full mt-2 h-24 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <div>
              <label className="font-medium">Types of Parts Sold</label>
              <textarea
                required
                name="partsDescription"
                value={supplierData.partsDescription}
                onChange={handleInputChange}
                className="w-full mt-2 h-24 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <div className="flex justify-between items-center mt-6">
              <a
                href="/supplierpayments"
                className="px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
              >
                Back
              </a>
              <button
                type="submit"
                className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      </div>
  );
};

export default AddSupplier;
