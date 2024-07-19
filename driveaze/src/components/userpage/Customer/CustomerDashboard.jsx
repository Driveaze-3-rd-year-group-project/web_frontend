import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { IconContext } from "react-icons";
import { IoCarSportSharp} from "react-icons/io5";
import { PiMotorcycleFill } from "react-icons/pi";

const Card = ({ brand = "Toyota", icon: Icon = IoCarSportSharp, model = "Yaris 2020", buttonText = "Info" }) => {

  const navigate = useNavigate(); 

  const handleClick = () => {

    navigate('/Vehicleinfo', { state: { brand, model } });
  };

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white p-10 mt-5 mb-5 ml-5">
      <div className="px-6 py-5">
        <div className="font-bold text-md mb-3 text-center">{brand}</div>
        <IconContext.Provider value={{ className: "center-icon", size: 100 }}>
          <div className="flex items-center justify-center mb-2">
            <Icon />
          </div>
        </IconContext.Provider>
        <p className="text-gray-700 text-center">
          {model}
        </p>
      </div>
      <div className="flex items-center justify-center mb-2">
        <button className="bg-deepblue hover:bg-blue-700 text-white font-bold py-2 px-3 rounded" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  return (
    <div className="flex flex-wrap justify-center">  
      <Card
        brand="Toyota"
        icon={IoCarSportSharp}
        model="Yaris 2020"
        buttonText="More Info"
      />
      <Card
        brand="Honda"
        icon={IoCarSportSharp} // Change the icon if desired
        model="Civic 2021"
        buttonText="More Info"
      />

    </div>
  );
};

export default CustomerDashboard;
