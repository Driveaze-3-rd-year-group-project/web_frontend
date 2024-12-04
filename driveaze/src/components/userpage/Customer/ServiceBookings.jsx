import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Calendar from '../Calender';
import { FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import BookingService from '../../service/BookingService';
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceBookings = () => {
  
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [reservationList, setServiceBookings] = useState([]);
  const [error, setError] = useState("");
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    preferredDate: "",
    preferredTime: "",
    status: "",
  });

  useEffect(() => {
    const fetchVehicleBrands = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllVehicleBrands(token);
        console.log('Fetched vehicle brands:', response.vehicleBrandList);
        setVehicleBrands(response.vehicleBrandList || []);
      } catch (err) {
        console.error(err);
        setVehicleBrands([]);
      }
    };

    fetchVehicleBrands();
  }, []);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      if (!selectedId) {
        setVehicleModels([]);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllVehicleModelsWithVehicleBrandId(selectedId,token);
        console.log('Fetched vehicle models:', response.vehicleModelList);
        setVehicleModels(response.vehicleModelList || []);
      } catch (err) {
        console.error(err);
        setVehicleModels([]);
      }
    };

    fetchVehicleModels();
  }, [selectedId]);




  useEffect(() => {
    const fetchServiceBookings = async () => {
      setError("");
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await BookingService.retrieveUserBookings(token);
        if (response.success) {
          console.log("data-->",response.message);
          setServiceBookings(response.message);
        } else {
          setServiceBookings([]);
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

  const isTimeValid = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    return selectedDateTime >= new Date();
  };

  const isWithinTwoDays = (createdDate) => {
    const created = new Date(createdDate); // Parse the createdDate
    const today = new Date(); // Current date
    const diffInTime = today - created; // Difference in milliseconds
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    return diffInDays <= 2; // Return true if within two days
  };


  const submitDelete = async (item) => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel this reservation? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });
  
      if (result.isConfirmed) {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await BookingService.deleteBooking(item, token);
  
        if (res.success) {
          toast.success("Reservation cancelled successfully");
          setServiceBookings((prev) => prev.filter((booking) => booking.bookingId !== item.bookingId)); // Remove the item locally
          setTimeout(() => {
            navigate("/servicebookings");
            setIsLoading(false);
          }, 4000);
        } else {
          Swal.fire("Error", res.message || "Failed to cancel reservation. Please try again!", "error");
        }
      } 
    } catch (err) {
      Swal.fire("Error", err.message || "An error occurred.", "error");
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };
  

  const convertTo12HourFormat = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":").map(Number); // Extract hour and minute
    const period = hour >= 12 ? "PM" : "AM"; // Determine AM/PM
    const hour12 = hour % 12 || 12; // Convert to 12-hour format, handling 12 AM and 12 PM
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const labelColors = {
    1: "text-green-600 bg-green-50",
    0: "text-orange-600 bg-orange-50",
  };

  return (
    <div className='flex flex-row'>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={true} />
      <div className='left-side w-9/12 mt-14'>
        <div className="max-w-2xl mx-auto px-4">
          <div className="items-start justify-between sm:flex">
            <div>
              <h4 className="text-gray-800 text-2xl font-bold">Service Bookings</h4>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <select
              className="py-2 px-6 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <a href="/booknewservice" className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0">
              Book a service date
            </a>
          </div>
  
          {/* Check if reservationList is null or empty */}
          {reservationList && reservationList.length > 0 ? (
            <ul className="mt-12 divide-y ">
              {Object.values(reservationList).map((item) => (
                <li key={item.bookingId} className="py-5 min-h-16 w-full flex items-start justify-between">
                  <div className="flex gap-3 flex-row ">
                    <img src='https://png.pngtree.com/png-vector/20191021/ourmid/pngtree-vector-car-icon-png-image_1834482.jpg' className="flex-none w-12 h-12 rounded-full" />
                    <div className="relative flex flex-row gap-8 items-center">
                      <div className="flex-auto flex gap-1  w-36 h-12 flex-col items-start justify-center">
                        <span className="block text-md w-full text-gray-700 font-semibold">{item.vehicleNo}</span>
                        <span className="block text-sm w-full text-gray-600">{item.brand} - {item.model}</span>
                      </div>
                      <div className="flex-auto flex items-center w-22 h-12   justify-center">
                        <span className="block text-sm text-gray-600">{item.preferredDate}</span>
                      </div>
                      <div className="flex-auto flex items-center w-22 h-12   justify-center">
                        <span className="block text-sm text-gray-600">
                        {convertTo12HourFormat(item.preferredTime)}
                        </span>
                      </div>
                      <div className="flex-auto flex items-center justify-center w-12 h-12">
                      <span className={`p-2 rounded-full font-semibold text-xs ${labelColors[item?.status] || ""}`}>
                        {item.status==0?"Pending":"Completed"}
                      </span>
                    </div>
                      <div className="flex-auto flex items-center justify-center w-24 h-12">
                      {item.status === 0 && isWithinTwoDays(item.createdDate) && (
                        <button
                          onClick={() => submitDelete(item)}
                          className="flex items-center justify-center p-3 w-15 font-medium text-sm text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg"
                        >
                          Cancel
                        </button>
                      )}     
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-12 text-gray-600 text-lg font-semibold">
              You haven't made any reservations yet.
            </div>
          )}
        </div>
      </div>
      <div className='right-side w-4/12 mt-36'>
        <Calendar />
      </div>
  
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
            <div className="flex justify-between items-center pb-3 relative">
              <button
                onClick={closePopup}
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
            </div>
            <ServiceBookingDetails
              closePopup={closePopup}
              updateData={updateData}
              handleChange={handleChange}
              submitUpdate={submitUpdate}
              submitDelete={submitDelete}
              isLoading={isLoading}
              vehicleBrands={vehicleBrands}
              vehicleModels={vehicleModels}
              selectedId={selectedId}
              setUpdateData={setUpdateData}
              setSelectedId={setSelectedId}

            />
          </div>
        </div>
      )}
    </div>
  );


};
export default ServiceBookings;