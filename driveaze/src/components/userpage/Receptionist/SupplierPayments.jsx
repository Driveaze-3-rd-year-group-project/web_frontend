import React, { useState } from "react";

const SupplierPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const members = [
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "John Lorin",
      email: "john@example.com",
      lastPaymentDate: "2024-06-15",
      lastBillDate: "2024-06-10",
      paymentStatus: "Pending",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Chris Bondi",
      email: "chrisbondi@example.com",
      lastPaymentDate: "2024-06-18",
      lastBillDate: "2024-06-12",
      paymentStatus: "Completed",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Yasmine",
      email: "yasmine@example.com",
      lastPaymentDate: "2024-06-20",
      lastBillDate: "2024-06-15",
      paymentStatus: "Pending",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
      name: "Joseph",
      email: "joseph@example.com",
      lastPaymentDate: "2024-06-22",
      lastBillDate: "2024-06-18",
      paymentStatus: "Completed",
    },
  ];

  // Sort members by lastPaymentDate in descending order
  const sortedMembers = [...members].sort(
    (a, b) => new Date(b.lastPaymentDate) - new Date(a.lastPaymentDate)
  );

  const filteredMembers = sortedMembers.filter((member) => {
    const matchesFilter =
      filter === "all" || filter === member.paymentStatus.toLowerCase();
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Supplier Payments
        </h3>
        <div className="mt-3 md:mt-0">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex max-w-md mx-auto"
          >
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

      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Filter by Payment Status</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          >
            <option value="all">All Suppliers</option>
            <option value="pending">Pending Payments</option>
            <option value="completed">Completed Payments</option>
          </select>
        </div>
        <a
          href="/supplierpayments/addsupplier"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add New Supplier
        </a>
      </div>

      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Supplier</th>
              <th className="py-3 px-6">Last Bill Date</th>
              <th className="py-3 px-6">Last Payment Date</th>
              <th className="py-3 px-6">Payment Status</th>
              <th className="py-3 px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredMembers.map((member, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={member.avatar}
                    className="w-10 h-10 rounded-full"
                    alt={member.name}
                  />
                  <div>
                    <span className="block text-sm text-gray-700 font-semibold">
                      {member.name}
                    </span>
                    <span className="block text-xs text-gray-600">
                      {member.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {member.lastBillDate}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {member.lastPaymentDate}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      member.paymentStatus === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {member.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <a
                    href="supplierpayments/manage"
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Manage
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierPayments;
