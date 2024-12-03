import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from '../../service/UserService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierPayments = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSupplier(currentPage);
  }, [currentPage]);

  const fetchSupplier = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllSuppliersWithPagination(page, token);

      // console.log('Fetched paginated suppliers:', response);


      const supplierData = response?.content || [];

      setSuppliers(supplierData);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setSuppliers([]);
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




  // const [searchTerm, setSearchTerm] = useState("");
  // const [filter, setFilter] = useState("all");



  

  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };

  // const suppliers = [
  //   {
  //     logo: "https://via.placeholder.com/50x50/ff5722/ffffff?text=ABC+Corp",
  //     name: "ABC Corporation",
  //     email: "contact@abccorp.lk",
  //     lastPaymentDate: "2024-06-15",
  //     lastBillDate: "2024-06-10",
  //     paymentStatus: "Pending",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/4caf50/ffffff?text=XYZ+Ltd",
  //     name: "XYZ Ltd",
  //     email: "info@xyzltd.lk",
  //     lastPaymentDate: "2024-06-18",
  //     lastBillDate: "2024-06-12",
  //     paymentStatus: "Completed",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/2196f3/ffffff?text=LMN+Inc",
  //     name: "LMN Inc",
  //     email: "contact@lmninc.lk",
  //     lastPaymentDate: "2024-06-20",
  //     lastBillDate: "2024-06-15",
  //     paymentStatus: "Pending",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/9c27b0/ffffff?text=PQR+Group",
  //     name: "PQR Group",
  //     email: "info@pqrgroup.lk",
  //     lastPaymentDate: "2024-06-22",
  //     lastBillDate: "2024-06-18",
  //     paymentStatus: "Completed",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/e91e63/ffffff?text=STU+Ltd",
  //     name: "STU Ltd",
  //     email: "contact@stuldt.lk",
  //     lastPaymentDate: "2024-06-15",
  //     lastBillDate: "2024-06-10",
  //     paymentStatus: "Pending",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/ff9800/ffffff?text=GHI+Co",
  //     name: "GHI Co",
  //     email: "info@ghico.lk",
  //     lastPaymentDate: "2024-06-25",
  //     lastBillDate: "2024-06-20",
  //     paymentStatus: "Completed",
  //   },
  //   {
  //     logo: "https://via.placeholder.com/50x50/673ab7/ffffff?text=JKL+LLC",
  //     name: "JKL LLC",
  //     email: "contact@jklllc.lk",
  //     lastPaymentDate: "2024-06-28",
  //     lastBillDate: "2024-06-24",
  //     paymentStatus: "Pending",
  //   },
  // ];

  // // Sort suppliers by lastPaymentDate in descending order
  // const sortedSuppliers = [...suppliers].sort(
  //   (a, b) => new Date(b.lastPaymentDate) - new Date(a.lastPaymentDate)
  // );

  // const filteredSuppliers = sortedSuppliers.filter((supplier) => {
  //   const matchesFilter =
  //     filter === "all" || filter === supplier.paymentStatus.toLowerCase();
  //   const matchesSearch = supplier.name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   return matchesFilter && matchesSearch;
  // });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Supplier Payments
        </h3>
        <div className="mt-3 md:mt-0">
          <form
            // onSubmit={(e) => e.preventDefault()}
            className="flex max-w-md mx-auto"
          >
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Filter by Payment Status</label>
          <select
            // value={filter}
            // onChange={handleFilterChange}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">All Suppliers</option>
            <option value="pending">Pending Payments</option>
            <option value="completed">Completed Payments</option>
          </select>
        </div>
        <a
          href="/addsupplier"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add New Supplier
        </a>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">

          {/* private Long supplierId;
    private String supplierEmail;
    private String contactNumber;
    private String supplierName;
    private String address;
    private String partsDescription;
    private LocalDate registeredDate; */}
            <tr>
              <th className="py-3 px-6">Registered Date</th>
              <th className="py-3 px-6">Supplier</th>
              <th className="py-3 px-6">Part Types</th>
              <th className="py-3 px-6">Address</th>
              <th className="py-3 px-6">Contact Number</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {Array.isArray(suppliers) && suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.registeredDate}
                </td>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src='https://via.placeholder.com/50x50/673ab7/ffffff?text=JKL+LLC'
                    className="w-10 h-10 rounded-full"
                    alt={supplier.supplierName}
                  />
                  <div>
                    <span className="block text-sm text-gray-700 font-semibold">
                      {supplier.supplierName}
                    </span>
                    <span className="block text-xs text-gray-600">
                      {supplier.supplierEmail}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.partsDescription}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.address}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.contactNumber}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <a
                    href="/managesupplier"
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                  >
                    Manage
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No Suppliers Found
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
};

export default SupplierPayments;
