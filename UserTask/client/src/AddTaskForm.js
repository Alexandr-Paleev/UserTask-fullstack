import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ListPlus } from 'lucide-react';

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  userId: z.string().min(1, "User is required"),
});

const AddTaskForm = ({ task_service_url, onTaskAdded }) => {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const userUrl = `${API_URL}/user`;
    axios.get(userUrl)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      user: { id: parseInt(data.userId, 10) }
    };
    
    try {
      await axios.post(task_service_url, payload);
      toast.success('Task added successfully!');
      reset();
      if (onTaskAdded) onTaskAdded();
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data || 'Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
      <div className="flex items-center mb-4 text-gray-700">
        <ListPlus size={20} className="mr-2" />
        <h3 className="text-lg font-bold">New Task</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Title</label>
          <input 
            {...register("title")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border" 
            placeholder="e.g. Weekly Meeting"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Description</label>
          <textarea 
            {...register("description")} 
            rows="2"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border" 
            placeholder="Task details..."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Address</label>
            <input 
                {...register("address")} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border" 
                placeholder="Office Room 302"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Start Time</label>
                <input 
                type="time"
                {...register("startTime")} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border" 
                />
                {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">End Time</label>
                <input 
                type="time"
                {...register("endTime")} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border" 
                />
                {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime.message}</p>}
            </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Assign to User</label>
          <select 
            {...register("userId")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm p-2 border bg-white"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.firstname} {user.lastname}</option>
            ))}
          </select>
          {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
        </div>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default AddTaskForm;
