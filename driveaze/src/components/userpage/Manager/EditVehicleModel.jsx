import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVehicleModel = () => {
  const { modelId } = useParams();
  const navigate = useNavigate();

  const [modelData, setModelData] = useState({
    modelName: '',
    brandId: '',
    fuelType: '',
    registeredDate: '',
  });

  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch vehicle model data and brands when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch vehicle brands
        const brandsResponse = await UserService.getAllVehicleBrands(token);
        setVehicleBrands(brandsResponse.vehicleBrandList || []);

        // Fetch current vehicle model data
        const modelResponse = await UserService.getVehicleModelById(modelId, token);
        if (modelResponse.statusCode === 200) {
          const modelDetails = modelResponse.vehicleModel;
          setModelData({
            modelName: modelDetails.modelName,
            brandId: modelDetails.brandId,
            fuelType: modelDetails.fuelType,
            registeredDate: modelDetails.registeredDate,
          });
        } else {
          toast.error('Failed to fetch vehicle model details');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error loading data');
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [modelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const res = await UserService.updateVehicleModel(modelId, modelData, token);
      
      if (res.statusCode === 200) {
        toast.success('Vehicle Model updated successfully');
        setTimeout(() => {
          navigate('/vehiclemodelbrand');
        }, 500);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="py-14 max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
      <div className="max-w-lg mx-auto space-y-3 sm:text-center">
        <h3 className="text-indigo-600 font-semibold">Edit Vehicle Model</h3>
      </div>

      <div className="mt-12 max-w-lg mx-auto space-y-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vehicle Model Input */}
          <div>
            <label className="block font-medium">Vehicle Model</label>
            <input
              type="text"
              value={modelData.modelName}
              name="modelName"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              placeholder="Enter Vehicle Model"
            />
          </div>

          {/* Vehicle Brand Select */}
          <div>
            <label className="block font-medium">Vehicle Brand</label>
            <select
              name="brandId"
              value={modelData.brandId}
              onChange={handleInputChange}
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              required
            >
              <option value="" disabled>Select a Brand</option>
              {vehicleBrands.map((brand) => (
                <option key={brand.brandId} value={brand.brandId}>
                  {brand.brandName}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type Select */}
          <div>
            <label className="block font-medium">Fuel Type</label>
            <select
              name="fuelType"
              value={modelData.fuelType}
              onChange={handleInputChange}
              className="w-full mt-2 px-3 py-2 text-gray-800 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              required
            >
              <option value="" disabled>Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-6">
            <a
              href="/vehiclemodelbrand"
              className="w-2/5 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150 text-center"
            >
              Back
            </a>
            <button
              type="submit"
              className="w-2/5 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150 text-center"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditVehicleModel;