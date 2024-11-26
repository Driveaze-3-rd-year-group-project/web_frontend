import React, { useState, useEffect } from "react";
import RetrieveComplaintService from "../../service/RetrieveComplaintService";

const CustomerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null); // For popup details

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Token missing.");
        }

        const response = await RetrieveComplaintService.retrieveComplaintData(token);
        if (response.success) {
          setComplaints(response.message); // Assuming the backend sends the data in the 'message' field
        } else {
          setError(response.message || "Failed to fetch complaints.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching complaints.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = complaints.filter((complaint) =>
    (complaint.customerEmail || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">Customer Complaints</h3>
        <div className="mt-3 md:mt-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md mx-auto">
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>

      {isLoading ? (
        <p>Loading complaints...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Complaint Date</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.complaintId} className="hover:bg-gray-100">
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={complaint.avatar || "https://via.placeholder.com/50"} // Default avatar
                      className="w-12 h-12 rounded-full"
                      alt={`${complaint.customerEmail || "Unknown"} avatar`}
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {complaint.customerEmail || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap">{complaint.date}</td>
                  <td className="py-3 px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleViewClick(complaint)}
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
      )}

      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h4 className="text-gray-800 text-xl font-bold mb-4">Complaint Details</h4>
            <div className="flex items-center gap-x-3 mb-4">
              <img
                src={selectedComplaint.avatar || "https://via.placeholder.com/50"}
                className="w-16 h-16 rounded-full"
                alt={`${selectedComplaint.customerEmail || "Unknown"} avatar`}
              />
              <div>
                <h5 className="text-gray-700 text-lg font-medium">
                  {selectedComplaint.customerEmail || "Unknown"}
                </h5>
              </div>
            </div>
            <p className="text-gray-800 mb-4">
              <strong>Complaint Date:</strong> {selectedComplaint.date}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Details:</strong> {selectedComplaint.description}
            </p>
            <p className="text-gray-800 mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={
                  selectedComplaint.status === 0
                    ? "text-orange-500 font-bold" // Pending (orange)
                    : "text-green-500 font-bold" // Resolved (green)
                }
              >
                {selectedComplaint.status === 0 ? "Pending" : "Resolved"}
              </span>
            </p>
            <button
              onClick={handleClosePopup}
              className="py-2 px-4 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerComplaints;
