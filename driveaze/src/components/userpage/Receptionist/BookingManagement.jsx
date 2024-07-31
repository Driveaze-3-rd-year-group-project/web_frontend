import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerName: "Nimal Perera",
      vehicleNumber: "WPQ 1234",
      brand: "Toyota",
      model: "Camry",
      status: "Pending",
      date: "2024-08-01",
      time: "10:00 AM",
    },
    {
      id: 2,
      customerName: "Kumarasiri Silva",
      vehicleNumber: "WPR 5678",
      brand: "Honda",
      model: "Accord",
      status: "Pending",
      date: "2024-08-02",
      time: "02:00 PM",
    },
    {
      id: 3,
      customerName: "Ayesha Fernando",
      vehicleNumber: "WPK 9012",
      brand: "Ford",
      model: "Focus",
      status: "Pending",
      date: "2024-08-03",
      time: "11:00 AM",
    },
    {
      id: 4,
      customerName: "Saman Wijesinghe",
      vehicleNumber: "WPL 3456",
      brand: "Chevrolet",
      model: "Malibu",
      status: "Arrived",
      date: "2024-08-04",
      time: "03:00 PM",
    },
    {
      id: 5,
      customerName: "Ravi Abeysekera",
      vehicleNumber: "WPM 7890",
      brand: "Nissan",
      model: "Altima",
      status: "Pending",
      date: "2024-08-05",
      time: "09:00 AM",
    },
  ]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBooking(null);
  };

  const handleAcceptBooking = (id) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status: "Arrived" } : b
    ));
  };

  const handleCreateNewJob = () => {
    // Logic for creating a new job
    alert('Create New Job button clicked');
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesQuery = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || booking.status === filterStatus;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Booking Management</h3>
        <div className="mt-3 md:mt-0">
          <form
            onSubmit={(e) => e.preventDefault()}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mb-3">
        <select
          className="py-2 px-4 border rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Arrived">Arrived</option>
        </select>
      </div>
      <ul className="divide-y mx-auto">
        {filteredBookings.map((booking) => (
          <li key={booking.id} className="py-2 flex items-start justify-between">
            <div className="flex-grow">
              <h4 className="font-medium">{booking.customerName}</h4>
              <p className="text-gray-600 text-sm">{booking.vehicleNumber} - {booking.brand} {booking.model}</p>
              <p className="text-gray-600 text-sm">{booking.date} at {booking.time}</p>
              <span className={`py-1 px-2 rounded-full text-xs ${booking.status === "Pending" ? "bg-yellow-50 text-yellow-600 font-bold" : booking.status === "Arrived" ? "bg-green-50 text-green-600" : "" }`}>
                {booking.status}
              </span>
            </div>
            <div className="flex-shrink-0 flex gap-5">
              {booking.status === "Pending" ? (
                <>
                  <button
                    onClick={() => handleAcceptBooking(booking.id)}
                    className="py-2 px-4 text-white font-medium bg-green-600 hover:bg-green-500 rounded-lg"
                  >
                    Vehicle Arrived
                  </button>
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    View Details
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                  >
                    View Details
                  </button>
                  <a
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

      {showDetails && selectedBooking && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center pb-3 relative">
              <button
                onClick={handleCloseDetails}
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
              <h4 className="text-xl font-semibold">Booking Details</h4>
            </div>
            <div className="space-y-4">
              <p><strong>Customer Name:</strong> {selectedBooking.customerName}</p>
              <p><strong>Vehicle Number:</strong> {selectedBooking.vehicleNumber}</p>
              <p><strong>Vehicle Brand and Model:</strong> {selectedBooking.brand} {selectedBooking.model}</p>
              <p><strong>Date:</strong> {selectedBooking.date}</p>
              <p><strong>Time:</strong> {selectedBooking.time}</p>
              <p><strong>Status:</strong> <span className={`py-1 px-2 rounded-full text-xs ${selectedBooking.status === "Pending" ? "bg-yellow-50 text-yellow-600 font-bold" : selectedBooking.status === "Arrived" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600 font-bold"}`}>{selectedBooking.status}</span></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
