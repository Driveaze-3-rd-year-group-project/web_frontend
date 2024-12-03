import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from '../../service/UserService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


  const TechnicianCategory = () => {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
    const [technicianCategories, setTechnicianCategories] = useState([]);
    
  useEffect(() => {
    // Fetch users data when the component mounts
    fetchTechnicianCategory(currentPage);
  }, [currentPage]);

  const fetchTechnicianCategory = async (page) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllTechnicianCategoriesWithPagination(page, token);
      setTechnicianCategories(response.content);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setTechnicianCategories([]);
    }
  };

  const handleDelete = (technicianCategoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Category?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          const res = await UserService.deleteTechnicianCategory(technicianCategoryId, token);

          if (res.statusCode === 200) {
            toast.success("Category Deleted successfully!");
            fetchTechnicianCategory(currentPage);
          } else {
            toast.error(res.message || 'Failed to Delete Category');
          }
        } catch (error) {
          console.error("Error deleting Category:", error);
          toast.error("Failed to delete Category");
        }
      }
    });
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Technician Categories
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
              // value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {/* Search Icon */}
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <a
          href="/addtechniciancategory"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Technician Category
        </a>
      </div>

      {/* technicianCategoryId;
    private String technicianCategoryName; */}

      {/* Technician Categories Table */}
      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Technician Category</th>
              <th className="py-3 px-6">Price Per Man Hour(LKR)</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
          {Array.isArray(technicianCategories) && technicianCategories.length > 0 ? (
            technicianCategories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6">{category.technicianCategoryName}</td>
                <td className="py-3 px-6">{category.pricePerManHour}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    {/* Edit Button */}
                    <a
                      href={`/edittechniciancategory/${category.technicianCategoryId}`}
                      className="text-indigo-600 hover:text-indigo-800 text-xl"
                    >
                      <FaEdit />
                    </a>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(category.technicianCategoryId)}
                      className="text-red-500 hover:text-red-800 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No jobs found
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
    </div>
  );
}

export default TechnicianCategory;
