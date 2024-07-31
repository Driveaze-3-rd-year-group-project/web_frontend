import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';

function CustomerAccounts() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllCustomers(token);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token');
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Customer Accounts
          </h3>
        </div>
        <div className="mt-3 md:mt-0 flex items-center space-x-4">
          <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md">
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
                onChange={handleSearchChange}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                    <th className="py-3 px-6">Username</th>
                    <th className="py-3 px-6">Role</th>
                    <th className="py-3 px-6">Registered Date</th>
                    <th className="py-3 px-6"></th>
                </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                        <img src="https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" className="w-10 h-10 rounded-full" />
                        <div>
                            <span className="block text-gray-700 text-sm font-medium">{user.name}</span>
                            <span className="block text-gray-700 text-xs">{user.email}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">2024/06/23</td>
                    <td className="text-center px-6 whitespace-nowrap">
                        <Link 
                          to={`/customer-details/${user.id}`}
                          className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
                        >
                          Details
                        </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerAccounts;
