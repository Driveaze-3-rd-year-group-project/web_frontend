import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleInfo = () => {
  const location = useLocation();
  const data = location.state;
  const vehicle=data;
  console.log(vehicle);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/ServiceHistory', { state: { brand, vehicle_number } });
  };

  return (
    <div  className="max-w-screen-xl mx-auto px-4 md:px-8 mr-auto mt-14">
      <div className="text-gray-800 text-xl font-bold sm:text-2xl mb-16">
        <h1 className="text-2xl font-bold mt-2">{vehicle.brand || 'No brand available'} - {vehicle.model || 'No model available'}</h1>
        <p className="text-gray-600 mt-2">
          {vehicle.vehicle_number|| 'No vehicle_number available'}
        </p>
      </div>
        <ul className="mt-12 divide-y flex justify-center">
            {
                
              <li className="flex py-5 justify-around">
                      <div className=''>
                          <div className="text-xl text-gray-700 mb-2 mr-12 font-semibold">Manufactured Year</div>
                          <div>{vehicle.manufactured_year}</div>
                      </div>
                      <div className=''>
                          <div className="text-xl text-gray-700 mb-2 mr-12 font-semibold">Registered Date</div>
                          <div>{vehicle.registered_date}</div>
                      </div>  
                      <div className=''>
                          <div className="text-xl text-gray-700 mb-2 mr-12 font-semibold">Last service</div>
                          <div>7/16/2024</div>
                      </div>
                      <div className=''>
                          <div className="text-xl text-gray-700 mb-2 mr-12 font-semibold">Last service</div>
                          <div>7/16/2024</div>
                      </div>  
              </li>
              
            }
        </ul>
        <div className="flex items-center justify-center m-5">
                        <button className="text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500 active:bg-indigo-700 font-bold py-2 px-2 rounded w-4/5 h-10" onClick={handleClick}>
                          Service records
                        </button>
                      </div>
        {/*
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto p-4">
        <p className='mb-2'>Last service: 7/16/2024</p>
        <p className='mb-2'>Last service: 7/16/2024</p>
        <p className='mb-2'>Color: {vehicle.color || 'No color available'}</p>
        <p className='mb-2'>Manufacture year: {vehicle.manufactured_year?.toString() || 'No manufactured year available'}</p>
        <p className='mb-2'>Registered date: {vehicle.registered_date || 'No registered date available'}</p>
      </div>
      <div className="flex items-center justify-center m-5">
        <button className="text-white bg-indigo-600 rounded-full duration-150 hover:bg-indigo-500 active:bg-indigo-700 font-bold py-2 px-2 rounded w-4/5 h-10" onClick={handleClick}>
          Service records
        </button>
      </div>
      */}
    </div>
  );
};

export default VehicleInfo;
