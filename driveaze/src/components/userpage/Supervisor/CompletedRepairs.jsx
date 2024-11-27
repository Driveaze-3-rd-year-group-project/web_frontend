import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SupervisorService from '../../service/SupervisorService';


const CompletedRepairs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { jobDetails, vehicle, serviceTypeDetails } = location.state || {};
  
  const [jobEntries, setJobEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState({ details: '', manHours: '' });
  
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
  
  const [technicians, setTechnicians] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [popupType, setPopupType] = useState('');

  useEffect(() => {
    fetchJobEntries();
    fetchTechnicians();
    fetchInventoryItems();
  }, []);

  const fetchJobEntries = async () => {
    if (!jobDetails) {
      setError(new Error('No job details provided'));
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await SupervisorService.getAllEntiesOfJobs(jobDetails.jobId, token);
      const transformedEntries = response.details.map(entry => ({
        jobEntryId: entry[0].jobEntryId,
        date: entry[0].entryDate,
        time: entry[0].time,
        details: entry[0].details,
        technicianName: entry[1],
        manHours: entry[0].manHours,
        technicianId: entry[0].technicianId
      }));

      setJobEntries(transformedEntries);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await SupervisorService.getAllStaff(token);
      setTechnicians(response.ourUsersList.filter(user => user.role === 'TECHNICIAN')); 
      console.log(response.ourUsersList);
    } catch (err) {
      console.error('Error fetching technicians:', err);
    }
  };

  const fetchInventoryItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await SupervisorService.getAllInventry(token);
      setInventoryItems(response.inventoryItemList); // Assuming this is the correct structure
    } catch (err) {
      console.error('Error fetching inventory items:', err);
    }
  };

  const openPopup = (type, index = null) => {
    if (type === 'update' && index !== null) {
      setCurrentDetail(jobEntries[index]);
      setSelectedTechnician(jobEntries[index].technicianId);
      setEditingIndex(index);
    } else {
      setCurrentDetail({ details: '', manHours: '' });
      setSelectedTechnician('');
      setSelectedInventoryItems([]);
    }
    setPopupType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentDetail({ details: '', manHours: '' });
    setSelectedTechnician('');
    setSelectedInventoryItems([]);
    setEditingIndex(null);
  };

  const filteredEntry = jobEntries
        .sort((a, b) => a.jobEntryId - b.jobEntryId);
        // .filter(entry => entry.details.toLowerCase().includes(searchTerm.toLowerCase()));
  // console.log(filteredEntry);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading job entries: {error.message}</div>;
  if (!jobDetails) return <div>No job details found</div>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Details for {vehicle.vehicleNo}
        </h3>
      </div>
      <div>
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Number:</strong> {vehicle.vehicleNo}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Vehicle Model:</strong> {vehicle.vehicleBrand + " " + vehicle.vehicleModel}
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Job Started Date:</strong> {jobDetails.startedDate}
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">
                <strong>Status:</strong>{" "}
                <span className={jobDetails.jobStatus === 1 ? "text-green-600" : "text-blue-600"}>
                  {jobDetails.jobStatus === 1 ? 'Completed' : 'Ongoing'}
                </span>
              </p>
              <p className="font-semibold text-gray-700">
                <strong>Service Type:</strong> {serviceTypeDetails.serviceName}
              </ p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto pt-6">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Date</th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Time</th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Details</th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Technician Name</th>
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Man Hours</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {filteredEntry.map((entry, index) => (
                <tr key={entry.jobEntryId} className="hover:bg-gray-100">
                  <td className="py-4 pl-8">{entry.date}</td>
                  <td className="py-4 pl-8">{entry.time}</td>
                  <td className="py-4 pl-8">{entry.details}</td>
                  <td className="py-4 pl-8">{entry.technicianName}</td>
                  <td className="py-4 pl-8">{entry.manHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>  
  );
};

export default CompletedRepairs;

