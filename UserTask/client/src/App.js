import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import UserList from './UserList';
import AddUserForm from './AddUserForm';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const USER_SERVICE_URL = `${API_URL}/user`;
const TASK_SERVICE_URL = `${API_URL}/task`;

const App = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);

  const fetchUsers = async () => {
    setIsFetchingUsers(true);
    try {
      const response = await axios.get(USER_SERVICE_URL);
      setUsers(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingUsers(false);
    }
  };

  const fetchTasks = async () => {
    setIsFetchingTasks(true);
    try {
      const response = await axios.get(TASK_SERVICE_URL);
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetchingTasks(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${TASK_SERVICE_URL}/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete task');
    }
  };

  const removeUser = async (id) => {
    try {
      await axios.delete(`${USER_SERVICE_URL}/${id}`);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    } catch (e) {
      console.error(e);
      toast.error('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">UserTask Manager</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Users</h2>
                <button 
                  onClick={fetchUsers} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  {isFetchingUsers ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              
              <div className="mb-6 max-h-96 overflow-y-auto">
                <UserList users={users} onDelete={removeUser} />
              </div>
              
              <div className="border-t pt-6">
                <AddUserForm user_service_url={USER_SERVICE_URL} onUserAdded={fetchUsers} />
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
                <button 
                  onClick={fetchTasks} 
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  {isFetchingTasks ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              
              <div className="mb-6 max-h-96 overflow-y-auto">
                <TaskList tasks={tasks} onDelete={removeTask} />
              </div>
              
              <div className="border-t pt-6">
                <AddTaskForm task_service_url={TASK_SERVICE_URL} onTaskAdded={fetchTasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
