import React, { useState } from "react";

const SupplierPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const suppliers = [
    {
      logo: "https://via.placeholder.com/50x50/ff5722/ffffff?text=ABC+Corp",
      name: "ABC Corporation",
      email: "contact@abccorp.lk",
      lastPaymentDate: "2024-06-15",
      lastBillDate: "2024-06-10",
      paymentStatus: "Pending",
    },
    {
      logo: "https://via.placeholder.com/50x50/4caf50/ffffff?text=XYZ+Ltd",
      name: "XYZ Ltd",
      email: "info@xyzltd.lk",
      lastPaymentDate: "2024-06-18",
      lastBillDate: "2024-06-12",
      paymentStatus: "Completed",
    },
    {
      logo: "https://via.placeholder.com/50x50/2196f3/ffffff?text=LMN+Inc",
      name: "LMN Inc",
      email: "contact@lmninc.lk",
      lastPaymentDate: "2024-06-20",
      lastBillDate: "2024-06-15",
      paymentStatus: "Pending",
    },
    {
      logo: "https://via.placeholder.com/50x50/9c27b0/ffffff?text=PQR+Group",
      name: "PQR Group",
      email: "info@pqrgroup.lk",
      lastPaymentDate: "2024-06-22",
      lastBillDate: "2024-06-18",
      paymentStatus: "Completed",
    },
    {
      logo: "https://via.placeholder.com/50x50/e91e63/ffffff?text=STU+Ltd",
      name: "STU Ltd",
      email: "contact@stuldt.lk",
      lastPaymentDate: "2024-06-15",
      lastBillDate: "2024-06-10",
      paymentStatus: "Pending",
    },
    {
      logo: "https://via.placeholder.com/50x50/ff9800/ffffff?text=GHI+Co",
      name: "GHI Co",
      email: "info@ghico.lk",
      lastPaymentDate: "2024-06-25",
      lastBillDate: "2024-06-20",
      paymentStatus: "Completed",
    },
    {
      logo: "https://via.placeholder.com/50x50/673ab7/ffffff?text=JKL+LLC",
      name: "JKL LLC",
      email: "contact@jklllc.lk",
      lastPaymentDate: "2024-06-28",
      lastBillDate: "2024-06-24",
      paymentStatus: "Pending",
    },
  ];

  // Sort suppliers by lastPaymentDate in descending order
  const sortedSuppliers = [...suppliers].sort(
    (a, b) => new Date(b.lastPaymentDate) - new Date(a.lastPaymentDate)
  );

  const filteredSuppliers = sortedSuppliers.filter((supplier) => {
    const matchesFilter =
      filter === "all" || filter === supplier.paymentStatus.toLowerCase();
    const matchesSearch = supplier.name
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
          href="/addsupplier"
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
            {filteredSuppliers.map((supplier, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={supplier.logo}
                    className="w-10 h-10 rounded-full"
                    alt={supplier.name}
                  />
                  <div>
                    <span className="block text-sm text-gray-700 font-semibold">
                      {supplier.name}
                    </span>
                    <span className="block text-xs text-gray-600">
                      {supplier.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.lastBillDate}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {supplier.lastPaymentDate}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <span
                    className={`font-medium ${
                      supplier.paymentStatus === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {supplier.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-6 whitespace-nowrap">
                  <a
                    href="/managesupplier"
                    className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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
