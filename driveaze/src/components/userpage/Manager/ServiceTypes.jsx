import React, { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceTypes() {

  const [serviceTypes, setServiceTypes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  console.log("Service Types:", serviceTypes);

  useEffect(() => {
    fetchServiceTypes(currentPage);
  }, [currentPage]);

  const fetchServiceTypes = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllServiceTypesWithPagination(page, token);

      // console.log("Fetched paginated:", response.content);

      // console.log('Fetched paginated vehicles:', response);

      setServiceTypes(response.content);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setServiceTypes([]);
    }
  };


  // Function to generate page numbers with "..." where necessary
  const getPages = (totalPages, currentPage) => {
    const pages = [];
    const maxPagesToShow = 5; // Show up to 5 page numbers including "..."
    const half = Math.floor(maxPagesToShow / 2);

    // If total pages are less than or equal to maxPagesToShow, show all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Calculate start and end page indices around currentPage
    let startPage = Math.max(0, currentPage - half);
    let endPage = Math.min(totalPages - 1, currentPage + half);

    // Adjust start and end to ensure maxPagesToShow pages are displayed
    if (currentPage - half < 0) {
      endPage = Math.min(totalPages - 1, endPage + (half - currentPage));
    } else if (currentPage + half >= totalPages) {
      startPage = Math.max(0, startPage - (currentPage + half - totalPages + 1));
    }

    // Add the first page and "..." if there's a gap
    if (startPage > 0) {
      pages.push(0);
      if (startPage > 1) {
        pages.push("...");
      }
    }

    // Add pages in the current range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add "..." and the last page if there's a gap
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };
  

  const deleteServiceTypes = async (serviceId) => {
    try {
        // Show the confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this Service Type?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
        });

        // If confirmed, delete the job and fetch the updated list of jobs
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          try {
              const res =await UserService.deleteServiceType(serviceId, token); 
              console.log('API Response for deleting job:', res);

              if (res.statusCode === 200) {
                toast.success("Service Type Deleted successfully!");
                fetchServiceTypes(currentPage);
              } else {
                // setError(res.message);
                toast.error(res.message || 'Failed to Delete Service Type');
              }
          } catch (error) {
              console.error('Error deleting Service Type:', error);
              toast.error('Error Deleting Service Type');
          }
        }
      
    } catch (error) {
        console.error('Error deleting Service type:', error);
        toast.error('Failed to delete Service type' + error.message);
    }
  };




  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    { name: "Oil Change", price: "1500.00" },
    { name: "Engine Check", price: "2000.00" },
    { name: "Tire Rotation", price: "1000.00" },
    { name: "Battery Replacement", price: "2500.00" },
    { name: "Brake Inspection", price: "1800.00" },
  ];

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (serviceName) => {
    alert(`Delete action triggered for: ${serviceName}`);
    // Add logic to handle delete action
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Service Types
        </h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-3">
        {/* Search Bar */}
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {/* Search Icon */}
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

<a
          href="/addservice"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Service
        </a>
      </div>

      {/* Service Table */}
      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Service Type Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {serviceTypes.map((service, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6">{service.registeredDate}</td>
                <td className="py-3 px-6">{service.serviceName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    {/* Edit Button */}
                    <Link
                      to={`/update-service-types/${service.serviceId}`}
                      className="text-indigo-600 hover:text-indigo-800 text-xl"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteServiceTypes(service.serviceId)}
                      className="text-red-500 hover:text-red-800 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Pagination */}
       <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8 mb-8">
        <div className="flex items-center justify-between text-sm text-gray-600 font-medium mt-4">
          <button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 border rounded-lg duration-150 hover:text-indigo-600 flex items-center gap-x-2 ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            <FaArrowLeft />
            Previous
          </button>
          {/* Page Numbers */}
          <div>
            <ul className="flex items-center gap-1">
              {getPages(totalPages, currentPage).map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item === "..." ? (
                    <div className="px-3 py-2">...</div>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      onClick={() => handlePageChange(item)}
                      aria-current={currentPage === item ? "page" : undefined}
                      className={`px-3 py-2 rounded-lg duration-150 hover:text-indigo-600 hover:bg-indigo-50 ${
                        currentPage === item ? "bg-indigo-50 text-indigo-600 font-medium" : ""
                      }`}
                    >
                      {item + 1} {/* Display 1-based page index */}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 border rounded-lg duration-150 hover:text-indigo-600 flex items-center gap-x-2 ${
              currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            Next
            <FaArrowRight />
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
}

export default ServiceTypes;
