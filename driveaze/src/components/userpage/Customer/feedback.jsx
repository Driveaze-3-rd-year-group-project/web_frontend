import React, { useState } from 'react';
import { FaCircle } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const feedback = () => {
  const location = useLocation();

  const navigate = useNavigate(); 

  const handleClick = () => {

    navigate('/newservice');
  };


  const tableItems = [
    {
      Date: "3/16/2023",
      Vehicle: "Regular Maintenance",
      Status: "Pending",
    },
    {
        Date: "3/16/2023",
        Vehicle: "Regular Maintenance",
        Status: "Accepted",
      },
      {
        Date: "3/16/2023",
        Vehicle: "Regular Maintenance",
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
          <button className="bg-dered hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"  onClick={handleClick}>
            Book a new service
          </button>
        </div>
        <div className="h-px bg-gray-200 border-t border-gray-400 my-4"></div>
      
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="mt-12 shadow-sm border rounded-lg overflow-hidden">
            <table className="w-full table-auto text-sm text-left">
              <tbody className="text-gray-600 divide-y">
                {tableItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">{item.Date}</td>
                  <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">{item.Vehicle}</td>
                  <td className="bg-deepblue text-white px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span>{item.Status}</span>
                      <FaCircle className={
                        item.Status === 'Pending' ? 'text-white' :
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

export default feedback;
