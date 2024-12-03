import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from '../../service/UserService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing

  // console.log('Vehicles:', vehicles);

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  const fetchVehicles = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllVehiclesWithPagination(page, token);

      // console.log('Fetched paginated vehicles:', response);
  
      const vehiclesData = response?.content || [];

      const updatedVehicles = await Promise.all(
        vehiclesData.map(async (vehicle) => {
          try {
            // Fetch Brand Details
            const brandResponse = await UserService.getVehicleBrandById(vehicle.vehicleBrandId, token);
            const brandName = brandResponse?.vehicleBrand?.brandName || "Unknown Brand";
  
            // Fetch Model Details
            const modelResponse = await UserService.getVehicleModelById(vehicle.vehicleModelId, token);
            const modelName = modelResponse?.vehicleModel?.modelName || "Unknown Model";
  
            return {
              ...vehicle,
              brandName,
              modelName,
            };
          } catch (error) {
            console.error(`Error fetching details for vehicle ID ${vehicle.vehicleId}:`, error);
            return {
              ...vehicle,
              brandName: "Unknown Brand",
              modelName: "Unknown Model",
            };
          }
        })
      );

      setVehicles(updatedVehicles);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles([]);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
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

  const deleteVehicles = (vehicleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this job?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const res = await UserService.deleteCustomerVehicle(vehicleId, token);

          if (res.statusCode === 200) {
            toast.success("Vehicle Deleted successfully!");
            fetchVehicles(currentPage);
          } else {
            toast.error(res.message || 'Failed to Delete Vehicle');
          }
        } catch (error) {
          console.error("Error deleting vehicle:", error);
          toast.error("Failed to delete vehicle");
        }
      }
    });
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between mb-3">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Vehicle Management
          </h3>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        {/* Left Section */}
        <div className="flex space-x-4">
          

          {/* Search Input */}
          <div className="flex flex-col">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  // value={searchTerm}
                  // onChange={handleSearchChange}
                  className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* Search Icon */}
                <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
        {/* Right Section */}
        <a
          href="/addvehicle"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Vehicle
        </a>
      </div>
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left overflow-hidden">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Vehicle Number & Model</th>
              <th className="py-3 px-6">Owner's Name</th>
              <th className="py-3 px-6">Owner's Email</th>
              <th className="py-3 px-6">Registered Phone No</th>
              <th className="py-3 px-6">Registered Date</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Array.isArray(vehicles) && vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">{vehicle.vehicleNo}</span>
                      <span className="block text-gray-700 text-xs">{vehicle.brandName}-{vehicle.modelName}</span>   
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehicle.ownerEmail ? vehicle.ownerEmail : "Email Not Available"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.ownerPhone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{vehicle.registeredDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-between items-center space-x-2 relative">

                      {/* Edit Icon with Tooltip */}
                      <div className="relative group">
                        <a
                          href={`/editvehicle/${vehicle.vehicleId}`}
                          className="text-indigo-600 hover:text-indigo-800 text-xl"
                        >
                          <FaEdit />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Edit Vehicle
                        </div>
                      </div>

                      {/* Delete Icon with Tooltip */}
                      <div className="relative group">
                        <a
                          onClick={() => deleteVehicles(vehicle.vehicleId)}
                          className="text-red-500 hover:text-red-800 text-xl"
                        >
                          <FaRegTrashAlt />
                        </a>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Delete Vehicle
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <div className="mt-12 text-gray-600 text-lg font-semibold">
                    No Vehicles Found
                </div>
              </tr>
            )}
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

export default VehicleManagement
