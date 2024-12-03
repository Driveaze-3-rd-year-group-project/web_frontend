import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BookingService from "../../service/BookingService";
import UserService from "../../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BookNewService = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submit state

  const [data, setData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    status: "pending",
    preferredDate: "",
    preferredTime: "",
  });

  const [error, setError] = useState("");
  const [vehicleBrands, setVehicleBrands] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const isTimeValid = (preferredDate, preferredTime) => {
    const currentDate = new Date();
    const bookingDate = new Date(`${preferredDate}T${preferredTime}:00`);
    return bookingDate > currentDate;
  };

  useEffect(() => {
    const fetchVehicleBrands = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getAllVehicleBrands(token);
        setVehicleBrands(response.vehicleBrandList || []);
      } catch (err) {
        console.error(err);
        setVehicleBrands([]);
      }
    };

    fetchVehicleBrands();
  }, []);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      if (!selectedId) {
        setVehicleModels([]);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await UserService.getAllVehicleModelsWithVehicleBrandId(selectedId, token);
        setVehicleModels(response.vehicleModelList || []);
      } catch (err) {
        console.error(err);
        setVehicleModels([]);
      }
    };

    fetchVehicleModels();
  }, [selectedId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand") {
      const selectedBrand = vehicleBrands.find((brand) => brand.brandName === value);
      setSelectedId(selectedBrand ? selectedBrand.brandId : ""); // Set selected brand ID
      setVehicleModels([]); // Clear models when the brand changes
      setData((prev) => ({
        ...prev,
        brand: value,
        model: "", // Reset model
      }));
    } else if (name === "model" && !selectedId) {
      setError("Please select a vehicle brand first.");
      setTimeout(() => setError(""), 3000);
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setIsSubmitting(true); // Prevent further submissions
    e.preventDefault();

    if (!isTimeValid(data.preferredDate, data.preferredTime)) {
      Swal.fire({
        title: "Error",
        text: "Invalid time slot or date selected. Please choose a valid date and time slot",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        setIsLoading(false);
        setIsSubmitting(false); // Enable submit button again after alert
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await BookingService.createBooking(data, token);
      if (res.success) {
        toast.success("Reservation created successfully");
        setTimeout(() => {
          navigate("/servicebookings");
          setIsLoading(true);
        }, 2500);
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred in creating a booking, please try again!",
          icon: "error",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
        setIsSubmitting(false); // Enable submit button again
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setIsLoading(false);
      setIsSubmitting(false); // Enable submit button again
    }
  };

  return (
    <main className="py-14">
       <ToastContainer position="top-right" autoClose={4000} hideProgressBar={true} />
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
                  onChange={(e) => {
                    const selectedBrand = vehicleBrands.find(
                      (brand) => brand.brandName === e.target.value
                    );
                    setData((prev) => ({
                      ...prev,
                      brand: selectedBrand ? selectedBrand.brandName : "",
                      model: "", // Clear model selection
                    }));
                    setSelectedId(selectedBrand ? selectedBrand.brandId : "");
                  }}
                  value={data.brand}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select a brand</option>
                  {vehicleBrands.map((brand) => (
                    <option key={brand.brandId} value={brand.brandName}>
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
                  onChange={(e) => {
                    const selectedModel = vehicleModels.find(
                      (model) => model.modelName === e.target.value
                    );
                    setData((prev) => ({
                      ...prev,
                      model: selectedModel ? selectedModel.modelName : "",
                    }));
                  }}
                  value={data.model}
                  disabled={!selectedId}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="" disabled hidden>
                    {selectedId ? "Select a Model" : "First select a Vehicle Brand"}
                  </option>
                  {vehicleModels.length > 0 ? (
                    vehicleModels.map((model) => (
                      <option key={model.modelId} value={model.modelName}>
                        {model.modelName}
                      </option>
                    ))
                  ) : (
                    selectedId && (
                      <option value="" disabled>
                        No Vehicle Models Available
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  id="preferredDate"
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
                  id="preferredTime"
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
                disabled={isLoading || isSubmitting} // Disable button during loading or submitting
                className="w-48 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 mt-6 rounded-lg duration-150"
              >
                {isLoading ? (
                  <div className="loader">Submitting...</div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

    </main>
  );
};

export default BookNewService;
