import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const VehicleInfo = () => {
  const location = useLocation();
  const { brand, model } = location.state || {}; // Make sure to use the correct keys

  const navigate = useNavigate(); 

  const handleClick = () => {

    navigate('/ServiceHistory', { state: { brand, model } });
  };

  return (
    <div className="max-w-screen-xl mx-auto p-10 shadow-lg ml-5 mt-10">
      <div className="max-w-lg">
        <h1 className="text-2xl font-bold mt-2">{brand}</h1>
        <p className="text-gray-600 mt-2">
          {model || "No model available."}
        </p>
      </div>
      <div class="h-px bg-gray-200 border-t border-gray-400 my-4"></div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto p-4">

        <p className='mb-2'>Last service:7/16/2024</p>
        <p>Last service:12/16/2024</p>
      </div>

      <div className="flex items-center justify-center m-5">
        <button  className="bg-deepblue hover:bg-blue-300 text-white font-bold py-2 px-2 rounded w-4/5 h-10"  onClick={handleClick}>
            Service records
        </button>
      </div>
    </div>
  );
};

export default VehicleInfo;
