import React, { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import Calendar from '../Calender';



const Upcomingservices = () => {
  const location = useLocation();

  const navigate = useNavigate(); 

  const handleClick = () => {

    navigate('/newservice');
  };

  const members = [
    {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
        brand: "Honda",
        model: "Civic",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "3/16/2023"
    }, {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
        brand: "Toyota",
        model: "Axio",
        vehi_no: "CBH-1312",
        status: "Upcoming",
        date: "4/16/2023"
    }, {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
        brand: "Nissan",
        model: "Caravan",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "5/16/2023"
    }, {
        icon: "https://i.pinimg.com/736x/7b/51/cc/7b51cc879d02e11f06c34858f850424c.jpg",
        brand: "Toyota",
        model: "Premio",
        vehi_no: "CBH-1312",
        status: "Completed",
        date: "6/16/2023"
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
          <div className='left-side w-2/3 mt-10'>
            <div className="max-w-2xl mx-auto px-4">
              <div className="items-start justify-between sm:flex">
                  <div>
                      <h4 className="text-gray-800 text-xl font-semibold">Service Bookings</h4>
                  </div>
                  <a href="javascript:void(0)" className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0">
                      Book a service date
                  </a>
                  
              </div>
              <div className="flex items-center justify-between mt-4 space-x-4">
                <div className="flex space-x-4">
                  <select
                    className="py-2 px-6 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
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
                                    <div className='absolute ml-52'>
                                      <span className="block text-sm text-gray-600">{item.date}</span>
                                    </div>
                                    <div className='absolute ml-80'>
                                      <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.status]?.color || ""}`}>{item.status}</span>
                                    </div>   
                                  </div>
                              </div>
                              <a href="javascript:void(0)" className="text-white text-sm border rounded-lg px-3 py-2 duration-150 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 ">Details</a>
                          </li>
                      ))
                  }
              </ul>
            </div>
          </div>
          <div className='right-side w-1/3 mt-32'>
            <Calendar />
          </div>
        </div>






      
        
          
      
     
    
  );
};

export default Upcomingservices;
