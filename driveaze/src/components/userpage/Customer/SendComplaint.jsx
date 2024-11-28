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
        const updatedComplaint = { ...complaint, date: currentDate };

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
                });
                closePopup();
            } else {
                setError(res.message || 'Failed to send complaint.');
                Swal.fire({
                    title: 'Error',
                    text: res.message || 'Failed to send complaint.',
                    icon: 'error',
                    confirmButtonText: 'OK',
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
                                        {item.status === 0 ? 'Pending' : 'Received'}
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
                <button
                    onClick={handleClick}
                    className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-white bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg sm:mt-0"
                >
                    Send a Complaint
                </button>
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
        </div>
    );
};

const Popup = ({ closePopup, complaint, handleChange, handleSubmit, isLoading }) => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
            <div className="flex justify-between items-center pb-3">
                <h4 className="text-xl font-semibold">Send Feedback</h4>
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
            <label className="font-medium">Please share your thoughts</label>
            <textarea
                value={complaint.description}
                onChange={handleChange}
                className="w-full h-20 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here..."
                required
            />
        </div>
        <div className="flex justify-center">
            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                disabled={isLoading}
            >
                {isLoading ? 'Submitting...' : 'Submit Complaint'}
            </button>
        </div>
    </form>
);

export default SendComplaint;
