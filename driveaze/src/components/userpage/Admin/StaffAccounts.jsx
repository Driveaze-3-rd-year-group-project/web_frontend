import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';

function StaffAccounts() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // Changed to 'all' as default

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllEmployees(token);
      //   console.log(response);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      // Prompt for confirmation before deleting the user
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');

      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        // After deleting the user, fetch the updated list of users
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || user.role.toLowerCase() === filter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-14">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Staff Accounts
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
      <div className="flex justify-end mt-2">
        <div className="flex justify-between items-center mb-3 w-full">
          <div className="flex flex-col">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="py-2 px-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </div>
          <Link
            to="/register-employee"
            className="py-2 px-4 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Create Staff Account
          </Link>
        </div>
      </div>
      <div className="mt-2 shadow-sm border rounded-lg overflow-x-auto"> 
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
                    <td className="px-6 py-4 whitespace-nowrap">2024/07/29</td>
                    <td className="text-center px-6 whitespace-nowrap">
                        <Link 
                          to={`/update-user/${user.id}`}
                          className="px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg duration-150"
                        >
                          Update
                        </Link>
                        <button onClick={() => deleteUser(user.id)} className="delete-button ml-4 px-4 py-2 text-white font-medium bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg duration-150">
                          Delete
                        </button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffAccounts