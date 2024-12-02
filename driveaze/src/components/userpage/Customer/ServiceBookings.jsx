import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Calendar from '../Calender';
import { FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import BookingService from '../../service/BookingService';

const ServiceBookings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [reservationList, setServiceBookings] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    preferredDate: "",
    preferredTime: "",
    status: "",
  });

  const handleClick = (item) => {
    setUpdateData({ ...item });
    setShowPopup(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const closePopup = () => {
    setShowPopup(false);
    setUpdateData({
      vehicleNo: "",
      brand: "",
      model: "",
      preferredDate: "",
      preferredTime: "",
      status: "",
    });
  };

  useEffect(() => {
    const fetchServiceBookings = async () => {
      setError("");
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await BookingService.retrieveUserBookings(token);
        if (response.success) {
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

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (!isTimeValid(updateData.preferredDate, updateData.preferredTime)) {
      Swal.fire({
        title: "Error",
        text: "Invalid time slot selected. Please choose a future time!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await BookingService.updateBooking(updateData, token);

      if (res.success) {
        Swal.fire("Success", res.message || "Booking updated successfully.", "success");
        setServiceBookings((prev) =>
          prev.map((item) =>
            item.bookingId === updateData.bookingId ? { ...item, ...updateData } : item
          )
        );
        closePopup();
      } else {
        Swal.fire("Error", res.message || "Failed to update booking.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "An error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const submitDelete = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await BookingService.deleteBooking(updateData.bookingId, token);

      if (res.success) {
        Swal.fire("Success", res.message || "Reservation cancelled successfully.", "success");
        setServiceBookings((prev) => prev.filter((item) => item.bookingId !== updateData.bookingId));
        closePopup();
      } else {
        Swal.fire("Error", res.message || "Failed to cancel reservation.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "An error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const labelColors = {
    accepted: "text-green-600 bg-green-50",
    waiting: "text-red-600 bg-red-50",
  };

  return (
    <div className='flex flex-row'>
      <div className='left-side w-2/3 mt-14'>
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
            <ul className="mt-12 divide-y">
              {Object.values(reservationList).map((item) => (
                <li key={item.bookingId} className="py-5 min-h-16 w-full flex items-start justify-between">
                  <div className="flex gap-3 flex-row ">
                    <img src={item.icon} className="flex-none w-12 h-12 rounded-full" />
                    <div className="relative flex flex-row gap-8 items-center">
                      <div className="flex-2 flex gap-1 flex-col items-start justify-center">
                        <span className="block text-md text-gray-700 font-semibold">{item.vehicleNo}</span>
                        <span className="block text-sm text-gray-600">{item.brand} - {item.model}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <span className="block text-sm text-gray-600">{item.preferredDate}</span>
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <span className="block text-sm text-gray-600">{item.preferredTime}</span>
                      </div>
                      <div className="flex-1 flex flex-row gap-8 mx-14 items-center justify-center">
                        <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.status]?.color || ""}`}>
                          {item.status}
                        </span>
                        <button
                          onClick={() => handleClick(item)}
                          className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
                        >
                          Details
                        </button>
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
      <div className='right-side w-1/3 mt-36'>
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
            />
          </div>
        </div>
      )}
    </div>
  );};

const ServiceBookingDetails = ({ closePopup,updateData,handleChange, submitUpdate, submitDelete}) => {
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = today.toTimeString().split(" ")[0]; // HH:MM:SS

  useEffect(() => {
    document.getElementById("preferredDate").setAttribute("min", currentDate);
    
    const formattedTime = currentTime.substring(0, 5);
    document.getElementById("preferredTime").setAttribute("min", formattedTime);
  }, [currentDate, currentTime]);

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 text-xl font-semibold">
            Service Reservation Details
          </h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={(e) => {
            e.preventDefault();
            closePopup();
          }} className="space-y-5">
            <div>
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                onChange={handleChange}
                required
                name='vehicleNo'
                value={updateData.vehicleNo}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Vehicle Brand</label>
                <select onChange={handleChange} name='brand' value={updateData.brand} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
                  <option>Honda</option>
                  <option>Nissan</option>
                  <option>Toyota</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <select name='model'value={updateData.model}  onChange={handleChange} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
                  <option>Civic</option>
                  <option>Altima</option>
                  <option>Corolla</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Preferred Date</label>
                <input
                  type="date"
                  id='preferredDate'
                  name='preferredDate'
                  value={updateData.preferredDate}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>   
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                    <label className="font-medium">Preferred Time</label>
                    <input
                        type="time"
                        id='preferredTime'
                        name='preferredTime'
                        value={updateData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
            </div>  
            <div className="flex gap-3 text-sm items-center justify-between mt-6">
            {updateData?.status== "waiting" && (
              <>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={submitDelete}
                  className="w-32 h-12 p-4 flex items-center justify-center text-white font-medium bg-red-600 hover:bg-red-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                >
                  Cancel Reservation
                </button>   

                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={submitUpdate}
                  className="w-32 h-12 p-4 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
                >
                  Update Reservation
                </button>
              </>
            )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ServiceBookings;