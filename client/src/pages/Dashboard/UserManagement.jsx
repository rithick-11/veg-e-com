import React, { useEffect, useState } from 'react';
import useAppStore from '../../store/useAppStore';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaSave, FaTimes, FaIdBadge } from 'react-icons/fa';

const UserManagement = () => {
  const { users, getAllUsers, updateUser, deleteUser, isLoading, error } = useAppStore();
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully!');
      } catch (err) {
        toast.error(err.message || 'Failed to delete user');
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleSaveRole = async () => {
    if (editingUser) {
      try {
        await updateUser(editingUser._id, { role: newRole });
        setEditingUser(null);
        setNewRole('');
        toast.success('User role updated successfully!');
      } catch (err) {
        toast.error(err.message || 'Failed to update user role');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewRole('');
  };

  if (isLoading) return <div className="text-center p-8">Loading users...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  const Tooltip = ({ text, children }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {text}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 whitespace-nowrap">
                  <Tooltip text={user._id}>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaIdBadge className="mr-2 text-gray-400" size={16} />
                      {user._id.substring(0, 8)}...
                    </div>
                  </Tooltip>
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm">
                  {editingUser?._id === user._id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    {editingUser?._id === user._id ? (
                      <>
                        <Tooltip text="Save">
                          <button
                            onClick={handleSaveRole}
                            className="text-green-600 hover:text-green-800 transition-colors"
                          >
                            <FaSave size={18} />
                          </button>
                        </Tooltip>
                        <Tooltip text="Cancel">
                          <button
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                          >
                            <FaTimes size={20} />
                          </button>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip text="Edit Role">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <FaEdit size={18} />
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete User">
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <FaTrash size={16} />
                          </button>
                        </Tooltip>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
