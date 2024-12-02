import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BookingService from "../../service/BookingService";

const BookNewService = () => {
  const [data, setData] = useState({
    vehicleNo: "",
    brand: "",
    model: "",
    status: "waiting", 
    preferredDate: "",
    preferredTime: "",
  });

  const isTimeValid = (preferredDate, preferredTime) => {
    const currentDate = new Date();
    const bookingDate = new Date(`${preferredDate}T${preferredTime}:00`);
    
    return bookingDate > currentDate;
  };
  

  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = today.toTimeString().split(" ")[0]; // HH:MM:SS

  useEffect(() => {
    document.getElementById("preferredDate").setAttribute("min", currentDate);
    
    const formattedTime = currentTime.substring(0, 5);
    document.getElementById("preferredTime").setAttribute("min", formattedTime);
  }, [currentDate, currentTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await BookingService.createBooking(data, token);

      if (res.success) {
        Swal.fire({
          title: "Success",
          text: res.message || "Booking created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: res.message || "Failed to create booking.",
          icon: "error",
          confirmButtonText: "OK",
        });
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
                  <option value="Honda">Honda</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Toyota">Toyota</option>
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
                  <option value="Civic">Civic</option>
                  <option value="Altima">Altima</option>
                  <option value="Corolla">Corolla</option>
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
            </div>
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
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
                disabled={isLoading}
                className={`w-48 h-12 flex items-center justify-center text-white font-medium ${isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"} mt-6 rounded-lg duration-150`}
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
