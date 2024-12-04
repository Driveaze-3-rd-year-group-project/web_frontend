import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from '../../service/UserService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function VehicleModelBrand() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPages1, setTotalPages1] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [currentPage1, setCurrentPage1] = useState(0); // 0-based indexing
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);

  const fetchBrands = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllBrandsWithPagination(page, token);
      console.log('Fetched paginated brands:', response);

  
      const brandsData = response?.content || [];

      setBrands(brandsData);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching Brands:", error);
      setBrands([]);
    }
  };

  useEffect(() => {
    fetchModels(currentPage1);
  }, [currentPage1]);

  const fetchModels = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllModelsWithPagination(page, token);
      console.log('Fetched paginated models:', response);

      const modelData = response.content;

      const updatedModels = await Promise.all(
        modelData.map(async (model) => {
          try {
            const brandId = model.brandId;
            const brandResponse = await UserService.getVehicleBrandById(brandId, token);
            const brandName = brandResponse.vehicleBrand.brandName;
            console.log('Fetched brands:', brandName);
  
            return {
              ...model,
              brandName
            };
          } catch (error) {
            console.error(`Error fetching details for job ID ${model.modelId}:`, error);
            return {
              ...model,
              brandName: 'Unknown'
            };
          }
        })
      );

      setModels(updatedModels);
      setTotalPages1(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching Models:", error);
      setModels([]);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageChange1 = (page) => {
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

  const getPages1 = (totalPages, currentPage) => {
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



  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Vehicle Model & Brands
        </h3>
      </div>

      {/* Search and Add Button */}
      

      {/* First Table */}
      
      <h3 className="text-lg font-bold text-gray-800 mb-4">Vehicle Brand Table</h3>
      <div className="flex justify-between items-center mb-3">
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              // value={searchTerm}
              // onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <a
          href="/addvehiclebrand"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Vehicle Brand
        </a>
      </div>
      <div className="shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Brand Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Array.isArray(brands) && brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img src="https://www.pngitem.com/pimgs/m/320-3203638_vehicle-icon-png-transparent-png.png" className="w-10 h-10" />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">{brand.brandName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-4">
                      <Link
                        to={`/update-vehicle/${brand.brandId}`}
                        className="text-indigo-600 hover:text-indigo-800 text-xl"
                      >
                        <FaEdit />
                      </Link>
                      {/* <button
                        onClick={() => handleDelete(brand.brandId)}
                        className="text-red-500 hover:text-red-800 text-xl"
                      >
                        <FaRegTrashAlt />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Vehicle Brands found
                </td>
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

      {/* Second Table */}
      
      <h3 className="text-lg font-bold text-gray-800 mb-4 mt-32">Vehicle Model Table</h3>
      <div className="flex justify-between items-center mb-3">
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              // value={searchTerm}
              // onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <a
          href="/addvehiclemodel"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Vehicle Model
        </a>
      </div>
      <div className=" shadow-sm border rounded-lg overflow-x-auto">
        
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Vehicle Model</th>
              <th className="py-3 px-6">Brand Name</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">

            {Array.isArray(models) && models.length > 0 ? (
              models.map((model, index) => (
                <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6">{model.modelName}</td>
                <td className="py-3 px-6">{model.brandName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    <Link
                      to={`/editvehiclemodel/${model.modelId}`}
                      className="text-indigo-600 hover:text-indigo-800 text-xl"
                    >
                      <FaEdit />
                    </Link>
                    {/* <button
                      onClick={() => handleDelete(vehicle.model)}
                      className="text-red-500 hover:text-red-800 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button> */}
                  </div>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No Vehicle Models found
                </td>
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
         onClick={() => handlePageChange1(currentPage - 1)}
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
             {getPages1(totalPages, currentPage).map((item, idx) => (
               <li key={idx} className="text-sm">
                 {item === "..." ? (
                   <div className="px-3 py-2">...</div>
                 ) : (
                   <a
                     href="javascript:void(0)"
                     onClick={() => handlePageChange1(item)}
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
           onClick={() => handlePageChange1(currentPage + 1)}
           className={`px-4 py-2 border rounded-lg duration-150 hover:text-indigo-600 flex items-center gap-x-2 ${
             currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
           }`}
         >
           Next
           <FaArrowRight />
         </button>
       </div>
     </div>
    </div>

     
  );
}

export default VehicleModelBrand;
