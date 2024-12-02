import React, { useEffect, useState } from 'react';
import CustomerComplaintService from '../../service/CustomerComplaintService';
import RetrieveComplaintService from '../../service/RetrieveComplaintService';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SendComplaint = () => {
    const [complaint, setComplaint] = useState({
        description: '',
        date: new Date().toISOString(),
        status: 0,
    });
    const [complaintData, setComplaintData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [reply, setReply] = useState('');

    const [isValid, setIsValid] = useState(true); 
    


    const handleClick = () => setShowPopup(true);

    const closePopup = () => {
        setShowPopup(false);
        setError('');
        setMessage('');
    };

    const handleChange = (e) => {
        setComplaint({ ...complaint, description: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString();
        const updatedComplaint = { ...complaint };

        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const res = await CustomerComplaintService.sendComplaintData(updatedComplaint, token);

            if (res.success) {
                setMessage(res.message || 'Complaint submitted successfully.');
                Swal.fire({
                    title: 'Success',
                    text: res.message || 'Complaint submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload(); // Refresh the page
                    }
                });
                closePopup();
            } else {
                setError(res.message || 'Failed to send complaint.');
                Swal.fire({
                    title: 'Error',
                    text: res.message || 'Failed to send complaint.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload(); 
                    }
                });
            }
        } catch (err) {
            setError(err.message || 'An error occurred.');
            Swal.fire({
                title: 'Error',
                text: err.message || 'An error occurred.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewClick = (complaint) => {
        setSelectedComplaint(complaint);
        setReply(complaint.reply || '');
    };

    const handleClosePopup = () => {
        setSelectedComplaint(null);
        setReply('');
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            setError('');
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await RetrieveComplaintService.retrieveUserComplaintData(token);
                if (response.success) {
                    setComplaintData(response.message || []);
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: response.message || 'Failed to retrieve your complaints.',
                        icon: 'error',
                        confirmButtonText: 'Close',
                    });
                }
            } catch (err) {
                Swal.fire({
                    title: 'Error',
                    text: err.message || 'An error occurred while retrieving complaints.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Your Filings</h3>
                <button
                    onClick={handleClick}
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0"
                >
                    Send a complaint
                </button>
            </div>

            <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Complaint Date</th>
                            <th className="py-3 px-6">Status</th>
                            <th className="py-3 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {complaintData.map((item) => (
                            <tr key={item.complaintId} className="hover:bg-gray-100">
                                <td className="py-3 px-6 whitespace-nowrap">{item.date}</td>
                                <td className="py-3 px-6 whitespace-nowrap">
                                    <span
                                        className={
                                            item.status === 0
                                                ? 'text-orange-500 font-bold'
                                                : 'text-green-500 font-bold'
                                        }
                                    >
                                        {item.status === 0 ? 'Pending' : 'Addressed'}
                                    </span>
                                </td>
                                <td className="py-3 px-6 whitespace-nowrap">
                                    <button
                                        onClick={() => handleViewClick(item)}
                                        className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
            </div>

            {showPopup && (
                <Popup
                    closePopup={closePopup}
                    complaint={complaint}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            )}

            {error && <p className="text-red-600 mt-4">{error}</p>}
            {message && <p className="text-green-600 mt-4">{message}</p>}



            {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-1/2 h-5/6 p-4 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-800 text-xl font-bold">Complaint Details</h4>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="flex items-center gap-x-3 mb-4">
                <div className="flex flex-col flex-grow">
                  <p className="text-gray-800">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        selectedComplaint.status === 0
                          ? "text-orange-500 font-bold"
                          : "text-green-500 font-bold"
                      }
                    >
                      {selectedComplaint.status === 0 ? "pending" : "addressed"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Complaint Details */}
              <p className="text-gray-800 mb-4">
                <strong>Complaint Date:</strong> {selectedComplaint.date}
              </p>
              <div className="mb-4">
                <p className="text-center py-0.5 bg-slate-200 rounded-md font-bold mb-2">
                  Description
                </p>
                <div className="p-4 bg-slate-100 rounded-lg w-full h-fit min-h-52 border overflow-auto text-wrap">
                  {selectedComplaint.description}
                </div>
              </div>

              {/* Reply Section */}
              <div className="mb-4">
                
                {selectedComplaint.reply ? (
                    <><p className="text-center py-0.5 text-white bg-blue-950 rounded-md font-bold mb-2">Reply</p>
                    <div className="p-4 bg-slate-600 min-h-52 text-white rounded-lg w-full h-full border overflow-auto text-wrap">
                            {selectedComplaint.reply}
                    </div></>
                ) : (
                    <p className="italic text-center py-0.5 text-white bg-blue-950 rounded-md font-bold mb-2">Your filing has not been addressed yet</p>
                )}
              </div>
            </div>
            <div className="flex justify-between">
            <button
              onClick={handleClosePopup}
              className="py-2 px-4 mx-1 mt-2 text-sm w-36 text-white font-medium bg-red-600 hover:bg-red-500 rounded-lg duration-150"
            >
              Close
            </button>
          </div>


          </div>
        </div>
      )}
        </div>


            
    );
};

const Popup = ({ closePopup, complaint, handleChange, handleSubmit, isLoading }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white w-1/2 h-fit p-4 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center pb-3">
                <h4 className="text-gray-800 text-xl font-bold">Report an issue</h4>
                <button onClick={closePopup} className="text-gray-600 hover:text-gray-900">
                    <FaTimes />
                </button>
            </div>
            <ServiceBookingDetails
                handleChange={handleChange}
                complaint={complaint}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    </div>
);

const ServiceBookingDetails = ({ handleChange, complaint, handleSubmit, isLoading }) => (
    <form onSubmit={handleSubmit} className="space-y-5">
         <div>
            <textarea
                onChange={handleChange}
                maxLength="1000"
                className={`w-full min-h-52 p-4 bg-slate-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 
                `}
                placeholder="Type your message here..."
                required
            />
        </div>
        <div className="flex justify-center">
        {!complaint.description.trim() ?(
                <button
                    type="submit"
                    className="py-2 px-4 text-white font-medium rounded-lg duration-150 bg-slate-400"
                    disabled
                    >
                    {isLoading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            ):(
                <button
                type="submit"
                className="py-2 px-4 text-white font-medium rounded-lg duration-150 bg-blue-600 hover:bg-green-500"
                >
                {isLoading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            ) 
        } 
        </div>
    </form>
);

export default SendComplaint;
