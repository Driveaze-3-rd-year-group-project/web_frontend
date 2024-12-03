import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CustomerComplaintService from "../../service/CustomerComplaintService";

const CustomerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reply, setReply] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null); 

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated. Token missing.");
        }

        const response = await CustomerComplaintService.retrieveAllComplaints(token);
        if (response.success) {
          const sortedComplaints = response.message.sort((a, b) => {
            // Sort pending (status 0) to the top, others below
            return a.status - b.status;
          });
          setComplaints(sortedComplaints);
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

  const handleMarkAsResolved = async (complaint) => {
    try {
      const token = localStorage.getItem("token");
      const updatedComplaint = { ...complaint, status: 1, reply }; 
      const response = await CustomerComplaintService.updateComplaintStatus(updatedComplaint,token);

      if (response.success) {
        setComplaints((prevComplaints) =>
          prevComplaints.map((c) =>
            c.complaintId === complaint.complaintId ? { ...c, status: 1, reply } : c
          )
        );
        Swal.fire({
          title: "Success!",
          text: "The complaint has been marked as resolved.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          setSelectedComplaint(null);
          setReply("");
          if (result.isConfirmed) {
            window.location.reload(); 
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.message || "Failed to update complaint status.",
          icon: "error",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(); 
          }
      })
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message || "An error occurred while updating the complaint status.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const filteredComplaints = complaints.filter((complaint) =>
    (complaint.customerEmail || "Unknown").toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
    setReply(complaint.reply || ""); // Pre-fill the reply field if there's an existing reply
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
    setReply("");
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
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.complaintId} className="hover:bg-gray-100">
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={complaint.avatar || "https://via.placeholder.com/50"} 
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
                    <span
                      className={
                        complaint.status === 0
                          ? "text-orange-500 font-bold" // Pending (orange)
                          : "text-green-500 font-bold" // Resolved (green)
                      }
                    >
                      {complaint.status === 0 ? "Pending" : "Resolved"}
                    </span>
                  </td>
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
          <div className="bg-white w-1/2 h-5/6 p-4 rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-800 text-xl font-bold">Complaint Details</h4>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="flex items-center gap-x-3 mb-4">
                <img
                  src={selectedComplaint.avatar || "https://via.placeholder.com/50"}
                  className="w-16 h-16 rounded-full"
                  alt={`${selectedComplaint.customerEmail || "Unknown"} avatar`}
                />
                <div className="flex flex-col flex-grow">
                  <h5 className="text-gray-700 text-lg font-medium">
                    {selectedComplaint.customerEmail || "Unknown"}
                  </h5>
                  <p className="text-gray-800">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        selectedComplaint.status === 0
                          ? "text-orange-500 font-bold"
                          : "text-green-500 font-bold"
                      }
                    >
                      {selectedComplaint.status === 0 ? "Pending" : "Resolved"}
                    </span>
                  </p>
                  <p className="text-gray-700 text-lg font-medium"><strong>Name:</strong>{selectedComplaint.complaintHolder}</p>
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
                <div className="p-4 bg-slate-100 rounded-lg border  overflow-auto">
                  {selectedComplaint.description}
                </div>
              </div>

              {/* Reply Section */}
              <div className="mb-4">
                <p className="text-center py-0.5 text-white bg-blue-950 rounded-md font-bold mb-2">
                  Reply
                </p>
                {selectedComplaint.reply ? (
                  <div className="p-4 bg-slate-600 min-h-52 text-white rounded-lg w-full h-full border overflow-auto">
                    {selectedComplaint.reply}
                  </div>
                ) : (
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    maxlength="1000"
                    className="w-full min-h-52 p-4 bg-slate-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  invalid:border-red-500 invalid:text-red-600
                            focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    placeholder="Type your reply here..."
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between">
            {!selectedComplaint.reply ? (
              !reply.trim() ? (
                <button
                  onClick={() => handleMarkAsResolved(selectedComplaint)}
                  className="py-2 px-4  mx-1 mt-2 font-medium  text-sm rounded-lg duration-150 bg-gray-400 cursor-not-allowed"
                  disabled
                >
                  Mark as Resolved
                </button>
              ) : (
                <button
                  onClick={() => handleMarkAsResolved(selectedComplaint)}
                  className="py-2 px-4  mx-1 mt-2 text-white  text-sm font-medium rounded-lg duration-150 bg-blue-600 hover:bg-green-500"
                >
                  Mark as Resolved
                </button>
              )
            ) : null}

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

export default CustomerComplaints;
