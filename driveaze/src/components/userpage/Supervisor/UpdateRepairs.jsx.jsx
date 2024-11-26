import React, { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SupervisorService from '../../service/SupervisorService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRepairs = () => {
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
        price: entry[0].price
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
      setEditingIndex(index);
      setSelectedTechnician(jobEntries[index].technicianName); // Set the technician for editing
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

  const handleSave = async () => {
    try {
      console.log(currentDetail);
      console.log(selectedTechnician);
      console.log(selectedInventoryItems);

      const token = localStorage.getItem('token');

      const updatedItems = [...jobEntries];
      if (popupType === 'update') {
        updatedItems[editingIndex] = { ...currentDetail, technicianName: selectedTechnician }; //   Add technician name
      } else {
        let validity =true;
        for(let i=0; i<selectedInventoryItems.length; i++){
          for(let j=0; j<inventoryItems.length; j++){
              if(selectedInventoryItems[i].inventoryId === inventoryItems[j].inventoryId){
                  if(selectedInventoryItems[i].quantity > inventoryItems[j].count){
                      validity=false;
                  }else{
                    break;
                  }
              }
          }
        }
        if (validity==true) {
        const payload = {
          jobRegistry: jobDetails,
          details: currentDetail.details,
          manHours: currentDetail.manHours,
          technicianId: selectedTechnician,
          entryDate: new Date().toISOString().split('T')[0],
          time: new Date().toISOString().split('T')[1].split('.')[0],
          inventoryItemList: selectedInventoryItems
        };
        console.log(payload);
        const res = await SupervisorService.addEntry(payload, token);
        if (res.statusCode === 200) {
            toast.success("Entry Added successfully!");
            setTimeout(() => {
              fetchJobEntries();
              closePopup();
            }, 1000);
        } else {
          setError(res.message);
          toast.error(res.message || 'Failed to add Entry');
        }
        }else{
          throw new Error('Quantity of inventory item is not enough');
        }
      }
      
      // setJobEntries(updatedItems);
      // closePopup();
    } catch (err) {
      console.error('Error saving job entry:', err);
      toast.error(err.message|| 'Failed to save job entry');
    }
  };

  const handleDelete = async (index) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
      if (confirmDelete) {
          const token = localStorage.getItem('token');
          await SupervisorService.deleteEntry(jobEntries[index].jobEntryId, token);
          fetchJobEntries();
      }
  } catch (error) {
      console.error('Error deleting job entry:', error);
  }
  };

  const handleCompleteJob = async () => {
    try { 
      const token = localStorage.getItem('token');
      
      // TODO: Implement backend method to mark job as completed
      // await SupervisorService.completeJob(jobDetails.jobId, token);
      
      navigate('/repairs');
    } catch (err) {
      console.error('Error completing job:', err);
      // Handle error (e.g., show error message)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading job entries: {error.message}</div>;
  if (!jobDetails) return <div>No job details found</div>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Job Details for {vehicle.vehicleNo}
        </h3>
        <button
          onClick={handleCompleteJob}
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Completed
        </button>
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
        <div>
          <div className="mt-6 md:mt-0 flex justify-end">
            <button
              onClick={() => openPopup('add')}
              className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Add Job Entry
            </button>
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
                <th className="py-3 pl-8 text-gray-600 font-medium text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {jobEntries.map((entry, index) => (
                <tr key={entry.jobEntryId} className="hover:bg-gray-100">
                  <td className="py-4 pl-8">{entry.date}</td>
                  <td className="py-4 pl-8">{entry.time}</td>
                  <td className="py-4 pl-8">{entry.details}</td>
                  <td className="py-4 pl-8">{entry.technicianName}</td>
                  <td className="py-4 pl-8">{entry.manHours}</td>
                  <td className="text-right whitespace-nowrap flex gap-2 py-2">
                    <button
                      onClick={() => openPopup('update', index)}
                      className="py-2 px-3 font-medium text-white bg-green-600 hover:bg-green-500 duration-150 rounded-lg flex items-center justify-center"
                    >
                      <FaRegEdit className="text-lg text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="py-2 px-3 font-medium text-white bg-red-600 hover:bg-red-500 duration-150 rounded-lg flex items-center justify-center"
                    >
                      <FaRegTrashAlt className="text-lg text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center pb-3 relative">
              <h3 className="text-indigo-600 text-xl font-semibold">
                {popupType === 'update' ? 'Update Job Entry' : 'Add New Job Entry'}
              </h3>
              <button 
                onClick={closePopup} 
                className="absolute top-0 right-0 text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }} className="space-y-5">
              <div>
                <label className="font-medium">Details</label>
                <input
                  type="text"
                  value={currentDetail.details}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, details: e.target.value })}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Man Hours</label>
                <input
                  type="number"
                  value={currentDetail.manHours}
                  onChange={(e) => setCurrentDetail({ ...currentDetail, manHours: e.target.value })}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Technician</label>
                <select
                  value={selectedTechnician}
                  onChange={(e) => setSelectedTechnician(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                >
                  <option value="">Select Technician</option>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Used Inventory Items</label>
                <div className="flex flex-col">
                  {selectedInventoryItems.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <select
                        value={item.id}
                        onChange={(e) => {
                          const newItems = [...selectedInventoryItems];
                          newItems[index].id = e.target.value;
                          setSelectedInventoryItems(newItems);
                        }}
                        className="mr-2"
                      >
                        <option value="">Select Item</option>
                        {inventoryItems.map(inv => (
                          <option key={inv.itemId} value={inv.itemId}>{inv.name}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newItems = [...selectedInventoryItems];
                          newItems[index].quantity = e.target.value;
                          setSelectedInventoryItems(newItems);
                        }}
                        placeholder="Quantity"
                        className="w-20 border rounded p-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = selectedInventoryItems.filter((_, i) => i !== index);
                          setSelectedInventoryItems(newItems);
                        }}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedInventoryItems([...selectedInventoryItems, { id: '', quantity: '' }])}
                    className="text-blue-500"
                  >
                    Add Inventory Item
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={closePopup}
                  className="w-40 h-12 flex items-center justify-center text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-40 h-12 flex items-center justify-center text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
                >
                  {popupType === 'update' ? 'Save Changes' : 'Add Entry'}
                </button>    
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>  
  );
};

export default UpdateRepairs;