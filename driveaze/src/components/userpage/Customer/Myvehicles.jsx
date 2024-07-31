import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';


const Myvehicles= () => {
  const navigate = useNavigate(); 
  const members = [
    {
      id: 1,
      vehicle_number: "WPQ 1234",
      brand: "Toyota",
      model: "Camry",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57665&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 2,
      vehicle_number:"WPR 5678" ,
      brand: "Honda",
      model: "Accord",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=18806&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 3,
      vehicle_number:"WPK 9012" ,
      brand: "Ford",
      model: "Focus",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57660&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 4,
      vehicle_number:"WPL 3456",
      brand: "Chevrolet",
      model: "Malibu",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57661&format=png&color=000000", // Replace with actual image URL
    },
    {
      id: 5,
      vehicle_number: "WPM 7890",
      brand: "Nissan",
      model: "Altima",
      color:"white",
      manufactured_year:"2010",
      registered_date:"01/01/2023",
      imageUrl: "https://img.icons8.com/?size=100&id=57662&format=png&color=000000", // Replace with actual image URL
    },
  ];

  const handleViewDetails = (vehicle) => {
    navigate('/Servicehistory', { state:vehicle  }); // Pass the entire vehicle object
  };
  

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-4">My Vehicles</h3>
      <ul className="divide-y mx-auto">
      {members.map((vehicle, idx) => (
          <li key={idx} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src={vehicle.imageUrl} 
                alt={`${vehicle.brand} ${vehicle.model}`} 
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <h2 className="font-bold text-gray-600 text-m m-3 ">{vehicle.vehicle_number}</h2>
              <p className="text-gray-600 text-sm">{vehicle.brand} {vehicle.model}</p>
            </div>
            <button
              onClick={() => handleViewDetails(vehicle)}
              className="py-2 px-4 text-white font-medium bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myvehicles;
