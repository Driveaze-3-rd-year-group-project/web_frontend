import React, { useState ,useEffect} from 'react';
import { FaTimes,FaSearch } from 'react-icons/fa';
import BookingService from '../../service/BookingService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBooking(null);
  };

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number); // Extract hour and minute
    const period = hour >= 12 ? "PM" : "AM"; // Determine AM/PM
    const hour12 = hour % 12 || 12; // Convert to 12-hour format, handling 12 AM and 12 PM
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };


const handleAcceptBooking = async (item) => {
  setError("");
  setIsLoading(true);

  const updatedData = { ...item, status: 1 }; // Update the status directly

  try {
    const token = localStorage.getItem("token");
    const response = await BookingService.updateBooking(updatedData, token);
    if (response.success) {
      toast.success("Booking updated successfully");

      // Update the bookings state without reloading the page
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.bookingId === updatedData.bookingId
            ? { ...booking, status: 1 } // Update the status locally
            : booking
        )
      );
    } else {
      Swal.fire({
        title: "Error",
        text: response.message || "Failed to update the booking. Please try again later!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: err.message || "Server Error, Please refresh and try again!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    setIsLoading(false); // Ensure loading state is reset
  }
};


  useEffect(() => {
    const fetchServiceBookings = async () => {
      setError("");
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await BookingService.retrieveAllBookings(token);
        if (response.success) {
          console.log("response.message-->",response.message);
          setBookings(response.message);
        } else {
          setBookings([]);
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message || "Error retrieving reservations. Please refresh or re-login!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceBookings();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCreateNewJob = () => {
    navigate("/create-job");
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={true} />
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Booking Management</h3>
      </div>
      <div className="mb-3">
        
      </div>
      <div className="flex justify-between items-center mb-3">
        {/* Left Section */}
        <div className="flex space-x-4">
          {/* Dropdown */}
          <div className="flex flex-col">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Arrived">Arrived</option>
            </select>
          </div>

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
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {/* Search Icon */}
                <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <ul className="divide-y mx-auto">
        {bookings.map((booking) => (
          <li key={booking.bookingId} className="py-2 flex items-start justify-between">
            <div className="flex-grow">
              <h4 className="font-medium">{booking.customerName}</h4>
              <p className="text-gray-600 text-sm">{booking.vehicleNo} - {booking.brand} {booking.model}</p>
              <p className="text-gray-600 text-sm">{booking.preferredDate} at {booking.preferredTime}</p>
              <span className={`py-1 px-2 rounded-full text-xs ${booking.status === 0 ? "bg-yellow-50 text-yellow-600 font-bold" : booking.status === 1 ? "bg-green-50 text-green-600" : "" }`}>
                {booking.status==0?"Pending":"Arrived"}
              </span>
            </div>
            <div className="flex-shrink-0 flex gap-5">
              {booking.status == 0 ? (
                <>
                  <button
                    disabled={isLoading}
                    onClick={() => handleAcceptBooking(booking)}
                    className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 rounded-lg"
                  >
                    Vehicle Arrived
                  </button>
                </>
              ) : (
                <>
                  <a
                    onClick={handleCreateNewJob}
                    href="/createnewjob"
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    Create New Job
                  </a>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default BookingManagement;
