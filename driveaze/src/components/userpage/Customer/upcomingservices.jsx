import React, { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import MyCalendar from './calender';



const Upcomingservices = () => {
  const location = useLocation();

  const navigate = useNavigate(); 

  const handleClick = () => {

    navigate('/newservice');
  };

 


  const tableItems = [
    {
      Date: "3/16/2023",
      Brand: "BMW-X3",
      vehi_no: "CBH-1312",
      Status: "Pending",
    },
    {
        Date: "3/16/2023",
        Brand: "Nissan-Caravan",
        vehi_no: "NC-9033",
        Status: "Accepted",
      },
      {
        Date: "3/16/2023",
        Brand: "Toyota-Corolla",
        vehi_no: "WP-8721",
        Status: "Rejected",
      },
    // Add more items with content
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-10 shadow-lg ml-5 mt-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Book a service</h1>
        </div>
          <button className="text-sm text-white duration-150 bg-indigo-600 rounded hover:bg-indigo-500 active:bg-indigo-700 font-bold py-2 px-4 rounded"  onClick={handleClick}>
            Book a new service
          </button>
        </div>
        <div className="h-px bg-gray-200 border-t border-gray-400 my-4"></div>
        <div>
        <MyCalendar/>
        </div>
      
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
            <table className="w-full table-auto text-sm text-left">
              <tbody className="text-gray-600 divide-y">
                {tableItems.map((item, idx) => (
                <tr className='font-semibold' key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.vehi_no}</td>
                  <td >
                    <div className="flex items-center space-x-2">
                      <span>{item.Status}</span>
                      <FaCircle className={
                        item.Status === 'Pending' ? 'text-black' :
                        item.Status === 'Rejected' ? 'text-red-500' :
                        item.Status === 'Accepted' ? 'text-green-500' :
                        ''
                      } />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Upcomingservices;
