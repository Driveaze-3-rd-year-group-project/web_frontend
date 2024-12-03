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


  /*const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'brand') {
      const selectedBrand = vehicleBrands.find((brand) => brand.brandName === value);
      // console.log('Selected vehicle brand:', selectedBrand);
      setSelectedId(selectedBrand ? selectedBrand.brandId : ''); // Set selected brand ID
      setVehicleModels([]); // Clear models when the brand changes
      setUpdateData((prev) => ({
        ...prev,
        brand: value,
        model: '', // Reset model
      }));
    } else if (name === 'model' && !selectedId) {
      setError('Please select a vehicle brand first.');
      setTimeout(() => setError(''), 3000);
    } else {
      setUpdateData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

    const handleClick = (item) => {
    setUpdateData({ ...item });
    setShowPopup(true);
  

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
  };*/

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
                    <img src={item.icon} className="flex-none w-12 h-12 rounded-full" />
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
                        { item.status==0?(
                        <button
                          onClick={() => submitDelete(item)}
                          className="flex items-center justify-center p-3 w-15 font-medium text-sm text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg"
                        >
                          Cancel
                        </button>
                          ):""}     
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

/*const ServiceBookingDetails = ({ closePopup,updateData,handleChange, submitUpdate, 
  submitDelete,isLoading,vehicleBrands,vehicleModels,selectedId, setUpdateData,setSelectedId}) => {
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
                <select
                  name="brand"
                  required
                  onChange={(e) => {
                    const selectedBrand = vehicleBrands.find(
                      (brand) => brand.brandName === e.target.value
                    );
                    setUpdateData((prev) => ({
                      ...prev,
                      brand:selectedBrand? selectedBrand.brandName:'',
                      model: '', // Clear model selection
                    }));
                    setSelectedId(selectedBrand ? selectedBrand.brandId : '');
                  }}
                  value={updateData.brand}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select a brand</option>
                  {vehicleBrands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandName}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <select
                  name="model"
                  required
                  onChange={(e) => {
                    const selectedModel = vehicleModels.find(
                      (model) => model.modelName === e.target.value
                    );
                    setUpdateData((prev) => ({
                      ...prev,
                      model: selectedModel ? selectedModel.modelName : '',
                    }));
                  }}
                  value={updateData.model}
                  disabled={!selectedId}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="" disabled hidden>
                    {selectedId ? 'Select a Model' : 'First select a Vehicle Brand'}
                  </option>
                  {vehicleModels.length > 0 ? (
                    vehicleModels.map((model) => (
                      <option key={model.modelId} value={model.modelName}>
                        {model.modelName}
                      </option>
                    ))
                  ) : (
                    selectedId && (
                      <option value="" disabled>
                        No Vehicle Models Available
                      </option>
                    )
                  )}
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
              </>
            )}
            </div>
          </form>
        </div>
      </div>
      
    </main>
  );
};
*/
};
export default ServiceBookings;