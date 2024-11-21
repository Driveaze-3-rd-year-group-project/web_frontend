import React, { useState } from "react";

const CustomerComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      name: "Ayesha Perera",
      email: "ayesha.perera@example.com",
      complaintDate: "2024-07-15",
      details: "Complaint about delayed service.",
      avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
    {
      name: "Dilani Wickramasinghe",
      email: "dilani.wickramasinghe@example.com",
      complaintDate: "2024-07-20",
      details: "Issues with the car repair.",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    },
    {
      name: "Samantha Silva",
      email: "samantha.silva@example.com",
      complaintDate: "2024-07-22",
      details: "Unresolved billing issue.",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    },
    {
      name: "Kasun Jayasinghe",
      email: "kasun.jayasinghe@example.com",
      complaintDate: "2024-07-25",
      details: "Complaint regarding customer service.",
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
    },
    {
      name: "Nimali Jayasinghe",
      email: "nimali.jayasinghe@example.com",
      complaintDate: "2024-07-25",
      details: "Complaint regarding booking service.",
      avatar: "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    },
  ];

  const handleViewClick = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleClosePopup = () => {
    setSelectedComplaint(null);
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Customer Complaints
        </h3>
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
            {filteredComplaints.map((complaint, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={complaint.avatar}
                    className="w-12 h-12 rounded-full"
                    alt={`${complaint.name} avatar`}
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">{complaint.name}</span>
                    <span className="block text-gray-600 text-xs">{complaint.email}</span>
                  </div>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">{complaint.complaintDate}</td>
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

      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h4 className="text-gray-800 text-xl font-bold mb-4">Complaint Details</h4>
            <div className="flex items-center gap-x-3 mb-4">
              <img
                src={selectedComplaint.avatar}
                className="w-16 h-16 rounded-full"
                alt={`${selectedComplaint.name} avatar`}
              />
              <div>
                <h5 className="text-gray-700 text-lg font-medium">{selectedComplaint.name}</h5>
                <p className="text-gray-600">{selectedComplaint.email}</p>
              </div>
            </div>
            <p className="text-gray-800 mb-4"><strong>Complaint Date:</strong> {selectedComplaint.complaintDate}</p>
            <p className="text-gray-800 mb-4"><strong>Details:</strong> {selectedComplaint.details}</p>
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
