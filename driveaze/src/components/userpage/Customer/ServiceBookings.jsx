import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Calendar from '../Calender';
import { FaTimes } from "react-icons/fa";

const ServiceBookings = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const members = [
    {
        icon: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000",
        brand: "Honda",
        model: "Civic",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "3/16/2023",
        time: "10:00AM"
    }, {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
        brand: "Toyota",
        model: "corolla",
        vehi_no: "CBH-1312",
        status: "Upcoming",
        date: "4/16/2023",
        time: "10:00AM"
    }, {
        icon: "https://img.icons8.com/?size=100&id=57662&format=png&color=000000",
        brand: "Nissan",
        model: "Caravan",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "5/16/2023",
        time: "10:00AM"
    }, {
        icon: "https://img.icons8.com/?size=100&id=57660&format=png&color=000000",
        brand: "Ford",
        model: "Focus",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "6/16/2023",
        time: "10:00AM"
    },
  ]
 

  const labelColors = {
    "Completed": {
        color: "text-green-600 bg-green-50",
    },
    "Upcoming": {
        color: "text-red-600 bg-red-50",
    },
  }

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
          <ul className="mt-12 divide-y">
            {
              members.map((item, idx) => (
                <li key={idx} className="py-5 flex items-start justify-between">
                    <div className="flex gap-3">
                        <img src={item.icon} className="flex-none w-12 h-12 rounded-full" />
                        <div className='relative flex flex-row'>
                        <div>
                            <span className="block text-md text-gray-700 font-semibold">{item.vehi_no}</span>
                            <span className="block text-sm text-gray-600">{item.brand}-{item.model}</span>
                        </div> 
                        <div className='absolute ml-32'>
                            <span className="block text-sm text-gray-600">{item.date}</span>
                        </div>
                        <div className='absolute ml-56'>
                            <span className="block text-sm text-gray-600">{item.time}</span>
                        </div>
                        <div className='absolute ml-80'>
                            <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.status]?.color || ""}`}>{item.status}</span>
                        </div>   
                        </div>
                    </div>
                    <button
                        onClick={handleClick}
                        className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0"
                    >
                        Details
                    </button>
                </li>
              ))
            }
          </ul>
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
                <ServiceBookingDetails closePopup={closePopup} />
            </div>
        </div>
      )}
    </div>
  );
};

const ServiceBookingDetails = ({ closePopup }) => {
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
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Vehicle Brand</label>
                <select className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
                  <option>Honda</option>
                  <option>Nissan</option>
                  <option>Toyota</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <select className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
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
                        required
                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                </div>
            </div>  
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={closePopup}
                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
              >
                Cancel Reservation
              </button>    
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ServiceBookings;