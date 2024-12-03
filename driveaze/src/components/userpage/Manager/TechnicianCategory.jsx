import React, { useState } from "react";
import { FaSearch, FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function TechnicianCategory() {
  const [searchTerm, setSearchTerm] = useState("");

  const technicianCategories = [
    { category: "Electrician", price: "2000.00" },
    { category: "Mechanic", price: "2500.00" },
    { category: "Painter", price: "1500.00" },
    { category: "Welder", price: "2200.00" },
    { category: "Technician", price: "1800.00" },
  ];

  const filteredCategories = technicianCategories.filter((category) =>
    category.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (categoryName) => {
    alert(`Delete action triggered for: ${categoryName}`);
    // Add logic to handle delete action
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Technician Categories
        </h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-3">
        {/* Search Bar */}
        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              className="py-2 px-3 pr-10 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {/* Search Icon */}
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <a
          href="/addtechniciancategory"
          className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Add Technician Category
        </a>
      </div>

      {/* Technician Categories Table */}
      <div className="mt-6 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Technician Category</th>
              <th className="py-3 px-6">Price Per Man Hour</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredCategories.map((category, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-6">{category.category}</td>
                <td className="py-3 px-6">{category.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    {/* Edit Button */}
                    <Link
                      to={`/update-technician-category/${category.category}`}
                      className="text-indigo-600 hover:text-indigo-800 text-xl"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(category.category)}
                      className="text-red-500 hover:text-red-800 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechnicianCategory;
