import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import UserService from "../../service/UserService";


const Myvehicles= () => {
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [totalPages, setTotalPages] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage]);

  const fetchVehicles = async (page) => {
    try {
      const token = localStorage.getItem("token");

      const userProfile = await UserService.getYourProfile(token);
      const customerPhoneNo = userProfile?.ourUsers?.contactNumber
      // console.log("Phone:",customerPhoneNo )

      const response = await UserService.getAllVehiclesWithPaginationAndStatusesByCustomerPhoneNo(customerPhoneNo, page, token);
      console.log('Fetched paginated vehicles:', response);
  
      const vehicledata = response?.content || [];

      const updatedVehicles = await Promise.all(
        vehicledata.map(async (vehicle) => {
          try {
            const brandResponse = await UserService.getVehicleBrandById(vehicle.vehicleBrandId , token);
            console.log("Fetched Vehicle Brand", brandResponse); 

            const brandName = brandResponse.vehicleBrand.brandName || "Unknown Brand";

            const modelResponse = await UserService.getVehicleModelById(vehicle.vehicleModelId , token);
            console.log("Fetched Vehicle Model", modelResponse); 

            const modelName = modelResponse.vehicleModel.modelName || "Unknown Model";

            return {
              ...vehicle,
              brandName,
              modelName
            };
          } catch (error) {
            console.error(`Error fetching details for bill ID ${vehicle.vehicleId}:`, error);
            return {
              ...vehicle,
              brandName: "Unknown Brand",
              modelName : "Unknown Model",
            };
          }
        })
      );

      // console.log("Updated vehicles:", updatedVehicles);

      setVehicles(updatedVehicles);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching bills:", error);
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


  const members = [
    {
      id: 1,
      vehicle_number: "WPQ 1234",
      brand: "Toyota",
      model: "Camry",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57665&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 2,
      vehicle_number:"WPR 5678" ,
      brand: "Honda",
      model: "Accord",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 3,
      vehicle_number:"WPK 9012" ,
      brand: "Ford",
      model: "Focus",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57660&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 4,
      vehicle_number:"WPL 3456",
      brand: "Chevrolet",
      model: "Malibu",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57661&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 5,
      vehicle_number: "WPM 7890",
      brand: "Nissan",
      model: "Altima",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57662&format=png&color=000000", // Replace with actual image URL
    },
  ];

  const handleViewDetails = (vehicle) => {
    navigate('/Servicehistory', { state:vehicle  }); // Pass the entire vehicle object
  };
  

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-4">My Vehicles</h3>
      <ul className="divide-y mx-auto">
      {Array.isArray(vehicles) && vehicles.length > 0 ? (
        vehicles.map((vehicle, idx) => (
          <li key={idx} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="https://img.icons8.com/?size=100&id=57665&format=png&color=000000"
                alt={`${vehicle.brandName} ${vehicle.modelName}`} 
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div className="flex flex-col items-center justify-between m-3">
                <h2 className="font-bold text-gray-600 text-lg">{vehicle.vehicleNo}</h2>
                <p className="text-gray-600 text-sm">{vehicle.brandName} {vehicle.modelName}</p>
              </div>
            </div>
            <a
              href={`/Servicehistory/${vehicle.vehicleId}`}
              className="py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              View Details
            </a>
          </li>
        ))
      ) : (
        <div className="mt-12 text-gray-600 text-lg font-semibold">
          No Vehicles Found
        </div>
      )}
      </ul>
      {/* Pagination */}
      {totalPages > 1 ? (
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
        ) : null}
    </div>
  );
};

export default Myvehicles;
