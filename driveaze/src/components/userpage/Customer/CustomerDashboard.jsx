import React from 'react'

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

export default CustomerDashboard