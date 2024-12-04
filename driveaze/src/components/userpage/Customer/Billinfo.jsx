import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaDownload } from "react-icons/fa";
import UserService from '../../service/UserService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js";

const Billinfo = () => {
  const navigate = useNavigate();
  const { billId } = useParams();
  const [billEntryData, setBillEntryData] = useState([]);
  const [totalAmountOfAllEntries, setTotalAmountOfAllEntries] = useState(''); 

  console.log("Total Amount of All Entries:", totalAmountOfAllEntries);

  console.log("Updated Bill Entry Data:",billEntryData )
  const [billData, setBillData] = useState({
    billId: '',
    jobId: '',
    vehicleNo: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleMilage: '',
    startedDate: '',
    billStatus: '',
    ownerName: '',
    ownerPhone: '',
  });

  console.log("Bill data", billData);

  useEffect(() => {
    fetchBill(billId);
  }, [billId]);

  const fetchBill = async (billId) => {
    try {
      const token = localStorage.getItem("token");
      const billResponse = await UserService.getBillById(billId, token);
      // console.log("Bill data", billResponse);
      const fetchedBill = billResponse.bill;

      const jobId = fetchedBill.jobRegistry.jobId;
      const jobResponse = await UserService.getJobById(jobId, token);
      // console.log("Job data", jobResponse);
      const fetchedJob = jobResponse.jobRegistry;

      // Fetch vehicle details
      const vehicle = await UserService.getCustomerVehicleById(fetchedJob.vehicleId, token);
      // console.log("Vehicle data", vehicle);

      // Fetch vehicle brand and model
      const vehicleBrandId = vehicle.customerVehicle.vehicleBrandId;
      const vehicleBrandData = await UserService.getVehicleBrandById(vehicleBrandId, token);
      const vehicleBrand = vehicleBrandData.vehicleBrand.brandName;
  
      const vehicleModelId = vehicle.customerVehicle.vehicleModelId;
      const vehicleModelData = await UserService.getVehicleModelById(vehicleModelId, token);
      const vehicleModel = vehicleModelData.vehicleModel.modelName;

      setBillData({
        billId: fetchedBill.billId,
        jobId: fetchedJob.jobId,
        vehicleNo: vehicle.customerVehicle.vehicleNo,
        vehicleBrand,
        vehicleModel,
        vehicleMilage: fetchedJob.vehicleMilage,
        startedDate: fetchedJob.startedDate,
        billStatus: fetchedBill.billStatus,
        ownerName: vehicle.customerVehicle.ownerName,
        ownerPhone: vehicle.customerVehicle.ownerPhone,
      });

      // Calculate total amount of all entries in the current bill
      const totalAmountOfAllEntries = fetchedBill.entries.reduce((sum, entry) => {
        return sum + (entry.totalPrice || 0); // Add the totalPrice if it exists, otherwise add 0
      }, 0);

      setTotalAmountOfAllEntries(totalAmountOfAllEntries);
    } catch (error) {
      console.error("Error fetching bill data:", error);
    }
  };

  useEffect(() => {
    fetchBillEntries(billId);
  }, [billId]);

  const fetchBillEntries = async (billId) => {
    try {
      const token = localStorage.getItem("token");
      const billEntryResponse = await UserService.getAllBillEntriesByBillId(billId, token);
      console.log("Bill Entry data", billEntryResponse);

      const billEntryData = billEntryResponse?.billEntryList || [];

      const updatedBillEntryData = await Promise.all(
        billEntryData.map(async (billEntry) => {
          try {
            const quantity = billEntry.quantity;
            const unitPrice = billEntry.unitPrice;
            const totalPrice = quantity*unitPrice;

            return {
              ...billEntry,
              totalPrice,
            };
          } catch (error) {
            console.error(`Error fetching details for billEntry ID ${billEntry.billEntryId}:`, error);
            return {
              ...billEntry,
              totalPrice: 0,
            };
          }
        })
      );

      setBillEntryData(updatedBillEntryData);
    } catch (error) {
      console.error("Error fetching bill Entry data:", error);
    }
  };

  // const generatePDF = () => {
  //   const element = document.getElementById("bill-container");
  
  //   // Select all elements to hide
  //   const elementsToHide = document.querySelectorAll(".hide-on-pdf");
  //   elementsToHide.forEach(el => el.style.display = "none"); // Temporarily hide
  
  //   const options = {
  //     margin: 5, // Margin around the content
  //     filename: `bill_${billData.ownerName}.pdf`,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: {
  //       scale: 3, // Adjust scale for better clarity
  //       useCORS: true, // Ensure external assets (images/fonts) are included
  //     },
  //     jsPDF: {
  //       unit: "mm",
  //       format: "a4", // A4 size
  //       orientation: "portrait",
  //     }
  //   };

  //   // Adjust styles to improve table appearance before generating the PDF
  //   const table = document.getElementById("bill-table");
  //   const tableStyle = table.style;
  //   tableStyle.borderCollapse = "collapse"; // Ensure borders are compact
  //   tableStyle.width = "100%"; // Full width for the table
  //   tableStyle.tableLayout = "fixed"; // Ensure columns have equal width

  //   const tableCells = table.querySelectorAll("th, td");
  //   tableCells.forEach((cell) => {
  //     cell.style.whiteSpace = "nowrap"; // Prevent wrapping for all cells
  //     cell.style.overflow = "hidden"; // Avoid content overflow
  //     cell.style.textOverflow = "ellipsis"; // Add ellipsis if content overflows
  //   });
  
  //   html2pdf()
  //     .from(element)
  //     .set(options)
  //     .save()
  //     .then(() => {
  //       // Restore visibility of elements after PDF generation
  //       elementsToHide.forEach(el => el.style.display = "");
  //     })
  //     .catch(error => console.error("Error generating PDF:", error));
  // };

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);

      const billId = billData.billId;
      console.log("Bill ID:", billId);
      const result = await UserService.downloadBill(billId, token);
      if (result.success) {
        console.log(result.message);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  
  const handlePayment = async () => {
    try {
        // Prepare order information
        const orderInfo = {
            billId: billData.billId, // Or your actual bill ID logic
            price: totalAmountOfAllEntries, // Your amount variable
        };

        // Navigate to payment page with order info
        navigate("/payment", {
            state: { orderInfo }, // Pass order info through route state
        });
    } catch (error) {
        console.error("Error initiating payment:", error);
        // Handle error appropriately
    }
};

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl mb-6">View Bill</h3>
      <div id="bill-container" className="border border-gray-300 rounded-lg p-4 shadow-md overflow-visible max-w-full">
        <h2 className="text-center text-lg font-bold">Samarasinghe Motors (PVT) LTD</h2>
        <h2 className="text-center text-lg font-bold">Invoice</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-slate-200 text-black flex items-center justify-center text-xl font-bold rounded-full">
              {/* {bill.image} */}
              <img src="https://png.pngtree.com/png-vector/20191021/ourmid/pngtree-vector-car-icon-png-image_1834482.jpg" alt="Vehicle" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
              {billData.vehicleNo} - {billData.vehicleBrand} {billData.vehicleModel}
              </h2>
              <div className="flex flex-row space-x-8 text-base">
                <div>
                  <div>
                    <span className="text-gray-600">Bill ID: </span>
                    <span className="text-gray-900">{billData.billId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Job ID: </span>
                    <span className="text-gray-900">{billData.jobId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Started Date: </span>
                    <span className="text-gray-900">{billData.startedDate}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className="text-gray-600">Owner Name: </span>
                    <span className="text-gray-900">{billData.ownerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Owner Phone: </span>
                    <span className="text-gray-900">{billData.ownerPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Vehicle Milage: </span>
                    <span className="text-gray-900">{billData.vehicleMilage}km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span
              className={`${
                billData.billStatus === 1 
                  ? "bg-white text-yellow-500"
                  : "bg-white text-green-500"
              }`}
            >
              {billData.billStatus === 1 ? "Pending Payment" : "Payment Completed"}
            </span>
            <button
                type="button"
                onClick={handleDownload}
                className="hide-on-pdf w-40 h-12 flex items-center justify-center text-white font-medium bg-gray-700 hover:bg-gray-600 active:bg-gray-800 mt-6 rounded-lg duration-150"
            >
              Download Bill
              <FaDownload className="ml-2" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table id="bill-table" className="w-full shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Service/Product</th>
                <th className="py-2 px-4 text-right">Quantity</th>
                <th className="py-2 px-4 text-right">Unit Price (LKR)</th>
                <th className="py-2 px-4 text-right">Total Cost (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(billEntryData) && billEntryData.length > 0 ? (
                  billEntryData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{data.billEntryDate}</td>
                      <td className="py-3 px-6 text-left">{data.serviceOrProduct}</td>
                      <td className="py-3 px-6 text-right">{data.quantity}</td>
                      <td className="py-3 px-6 text-right">{data.unitPrice}.00</td>
                      <td className="py-3 px-6 text-right">{data.totalPrice}.00</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Bill Entries Available
                    </td>
                  </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200 border-t">
                <td className="py-2 px-4 text-right font-bold text-xl" colSpan="4">Bill Total: </td>
                <td className="py-2 px-4 text-right font-bold text-base">
                  LKR.{totalAmountOfAllEntries}.00
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-8 flex justify-between space-x-4">
          <a
            href="/billings"
            className="hide-on-pdf w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
          >
            Back
          </a>
          {billData.billStatus === 1 && (
            <button
              onClick={handlePayment}
              className="hide-on-pdf w-40 h-12 flex items-center justify-center text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg duration-150"
            >
              Pay Online
            </button>
          )}
          
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Billinfo;

