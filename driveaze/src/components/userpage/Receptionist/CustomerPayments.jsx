import React, { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaInfoCircle, FaRegTrashAlt, FaArrowLeft, FaArrowRight  } from 'react-icons/fa';
import UserService from "../../service/UserService";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerPayments = () => {
  const [currentPage, setCurrentPage] = useState(0); // 0-based indexing
  const [totalPages, setTotalPages] = useState(1);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page) => {
    try {
      const statuses = [1, 2]; // Status 1 and 2
      const token = localStorage.getItem("token");
      const response = await UserService.getAllBillsWithPaginationAndStatuses(statuses, page, token);

      // console.log('Fetched paginated bills:', response);
  
      const billsData = response?.content || [];

      const updatedBills = await Promise.all(
        billsData.map(async (bill) => {
          try {
            // Fetch supervisor name
            const vehicleResponse = await UserService.getCustomerVehicleById(bill.jobRegistry.vehicleId , token);
            // console.log("Fetched Vehicle", vehicleResponse);

            const ownerName = vehicleResponse.customerVehicle.ownerName;

            const vehicleNo = vehicleResponse?.customerVehicle?.vehicleNo || "Not Available";

            const vehicleBrandId = vehicleResponse.customerVehicle.vehicleBrandId;
            const vehicleModelId = vehicleResponse.customerVehicle.vehicleModelId;

            const vehicleBrandResponse = await UserService.getVehicleBrandById(vehicleBrandId, token);
            const vehicleBrand = vehicleBrandResponse?.vehicleBrand?.brandName || "Unknown Brand";
            // console.log("Fetched Vehicle Brand", vehicleBrand);

            const vehicleModelResponse = await UserService.getVehicleModelById(vehicleModelId, token);
            const vehicleModel = vehicleModelResponse?.vehicleModel?.modelName || "Unknown Model";
            // console.log("Fetched Vehicle Model", vehicleModel);

            const entries = bill.entries; // Get the entries of the bill
            
            // Calculate the total sum of totalPrice for the entries
            const totalAmount = entries.reduce((sum, entry) => {
              return sum + (entry.totalPrice || 0); // Add the totalPrice if it exists, otherwise add 0
            }, 0);
            
            // console.log("Total Sum of all entries' total prices for bill ID", bill.billId, ":", totalAmount);
            

            return {
              ...bill,
              vehicleNo,
              vehicleBrand,
              vehicleModel,
              ownerName,
              totalAmount,
            };
          } catch (error) {
            console.error(`Error fetching details for bill ID ${bill.billId}:`, error);
            return {
              ...bill,
              vehicleNo: "Unknown Vehicle",
              vehicleBrand: "Unknown Brand",
              vehicleModel : "Unknown Model",
              ownerName: "Unknown Owner",
              totalAmount: 0,
            };
          }
        })
      );

      // console.log("Updated bills:", updatedBills);

      setBills(updatedBills);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching bills:", error);
      setJobs([]);
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


  // const [bills, setBills] = useState(initialBills);
  const [filter, setFilter] = useState("All");
  const [selectedBill, setSelectedBill] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBills = bills
    .filter((bill) => {
      if (filter !== "All" && bill.status !== filter) return false;
      if (searchTerm && !(
        bill.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) // Include customer name in search
      )) return false;
      return true;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex items-start justify-between">
            <div className="max-w-lg">
              <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                Customer Payments
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 space-x-4">
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="py-2 px-4 mb-1 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>

              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
                </div>
              </form>
          
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {Array.isArray(bills) && bills.length > 0 ? (
              filteredBills.map((bill) => (
                <div
                  key={bill.id}
                  className="border border-gray-300 rounded-lg p-3 shadow-md flex flex-col items-start"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="w-16 h-16 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full mb-2">
                      <img className="w-16 h-16 rounded-full" src="https://png.pngtree.com/png-vector/20191021/ourmid/pngtree-vector-car-icon-png-image_1834482.jpg" alt={bill.brand} />
                    </div>
                    <span
                      className={`${
                        bill.billStatus === 1 
                          ? "bg-white text-yellow-500"
                          : "bg-white text-green-500"
                      }`}
                    >
                      {bill.billStatus === 1 ? "Pending Payment" : "Payment Completed"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold">
                    {bill.vehicleNo} - {bill.vehicleBrand} {bill.vehicleModel}
                  </h2>
                  <p className="text-gray-600 mt-2 font-bold">
                    Job ID: {bill.jobRegistry.jobId} {/* Display customer name */}
                  </p>
                  <p className="text-gray-600 mt-2 font-bold">
                    Customer: {bill.ownerName} {/* Display customer name */}
                  </p>
                  <p className="text-black font-bold mt-2">
                    Total Amount: LKR{bill.totalAmount}
                  </p>
                  <div className="flex justify-between items-center w-full mt-4">
                    
                    {/* {bill.billStatus === 1 && (
                       <div className="flex justify-start items-center w-full">
                        <a
                          href={`/editbill/${bill.billId}`}
                          className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                          Edit Bill
                        </a>
                      </div>
                    )} */}
                    <div className="flex justify-end items-center w-full">
                      <a
                        href={`/billpaymentview/${bill.billId}`}
                        className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-green-700 rounded-lg duration-150"
                      >
                        View Bill
                      </a>
                    </div>
                    
                    
                  </div>
                </div>
            ))
          ) : (
            <div className="mt-12 text-gray-600 text-lg font-semibold">
              No bills found
            </div>
          )}
        </div>
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
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default CustomerPayments;
