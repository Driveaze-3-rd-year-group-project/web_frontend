import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BookingService from "../../service/BookingService";
import VehicleService from "../../service/VehicleService";

const BookNewService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    status: "waiting",
    preferredDate: "",
    preferredTime: "",
  });

  const [brandsModels, setBrandsModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [error, setError] = useState("");

  const isTimeValid = (preferredDate, preferredTime) => {
    const currentDate = new Date();
    const bookingDate = new Date(`${preferredDate}T${preferredTime}:00`);
    return bookingDate > currentDate;
  };

  useEffect(() => {
    console.log("Selected brand updated:", selectedBrand);
    // Filter models based on selected brand
    if (selectedBrand) {
      const brand = brandsModels.find(brand => brand.brandId === selectedBrand);
      
      setAvailableModels(brand ? brand.models : []); // Set models for selected brand
      console.log('availableModels--->'+availableModels);
    } else {
      setAvailableModels([]); // Reset models if no brand is selected
    }
  }, [selectedBrand, brandsModels]); // Runs when selectedBrand or brandsModels change

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") {
      setSelectedBrand(value); // Set the selected brand
      setData({ ...data, [name]: value, model: "" }); // Reset model when brand changes
    } else {
      setData({ ...data, [name]: value });
    }
    console.log("Value:", value, "Data object:", data);
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      setError("");
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await VehicleService.getBrandsWithModels(token);
        if (response.success) {
          setBrandsModels(response.message); // Set brands with models
          console.log("brandsmodels-->", response.message);
        } else {
          throw new Error(
            response.message || "Error fetching vehicle data. Please try again."
          );
        }
      } catch (err) {
        setError(err.message);
        Swal.fire({
          title: "Error",
          text: err.message || "Error retrieving data from the server!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isTimeValid(data.preferredDate, data.preferredTime)) {
      Swal.fire({
        title: "Error",
        text: "Invalid time slot or date selected. Please choose a valid date and time.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await BookingService.createBooking(data, token);

      if (res.success) {
        Swal.fire({
          title: "Success",
          text: res.message || "Booking created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        throw new Error(res.message || "Failed to create booking.");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto my-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold">Book a Service Date</h3>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNo"
                onChange={handleChange}
                value={data.vehicleNo}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Vehicle Brand</label>
                <select
                  name="brand"
                  required
                  onChange={handleChange}
                  value={data.brand}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select a brand</option>
                  {brandsModels.map((brand) => (
                    <option key={brand.brandId} value={brand.brandId}>
                      {brand.brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Vehicle Model</label>
                <select
                  name="model"
                  required
                  onChange={handleChange}
                  value={data.model}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select a model</option>
                  {availableModels.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                      {model.modelName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  onChange={handleChange}
                  value={data.preferredDate}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Preferred Time</label>
                <input
                  type="time"
                  name="preferredTime"
                  required
                  onChange={handleChange}
                  value={data.preferredTime}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <a
                href="/servicebookings"
                className="w-48 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 mt-6 rounded-lg duration-150"
              >
                Back
              </a>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-48 h-12 flex items-center justify-center text-white font-medium ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
                } mt-6 rounded-lg duration-150`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BookNewService;
