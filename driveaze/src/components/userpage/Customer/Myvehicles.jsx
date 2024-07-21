import React from 'react';
import { useNavigate } from 'react-router-dom';

const Myvehicles = ({ brand, vehi_no }) => {
  const navigate = useNavigate();

  const handleClick = (item) => { // Pass the item object directly
    navigate('/Vehicleinfo', { state: item }); // Use the item object as state
  };

  const members = [
    {
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-toyota-1-202914.png?f=webp&w=256",
      brand: "Toyota-Corolla",
      vehi_no: "WP-8721",
      color:"white",
      manufacture_year:"2010",
      registered_date:"01/01/2023"
    },
    {
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-bmw-4-202746.png?f=webp&w=256",
      brand: "BMW-X3",
      vehi_no: "CBH-1312",
      color:"blue",
      manufacture_year:"2017",
      registered_date:"01/01/2023"
    },
    {
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-nissan-5-202859.png?f=webp&w=256",
      brand: "Nissan-Caravan",
      vehi_no: "NC-9033",
      color:"white",
      manufacture_year:"2014",
      registered_date:"01/01/2023"
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 mt-20">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-xl font-bold">My Vehicles</h4>
        </div>
      </div>
      <div className="h-px bg-gray-200 border-t border-gray-400 mt-4 mb-2"></div>
      <ul className="mt-8 divide-y">
        {members.map((item, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <img src={item.logo} className="flex-none w-12 h-12 rounded" />
              <div>
                <span className="block text-sm text-gray-700 font-semibold">{item.brand}</span>
                <span className="block text-sm text-gray-600">{item.vehi_no}</span>
              </div>
            </div>
            <button className="px-4 py-2 text-white bg-indigo-600 rounded-full duration-150 hover:bg-indigo-500 active:bg-indigo-700" onClick={() => handleClick(item)}>
              Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myvehicles;
