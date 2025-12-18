import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const schema = z.object({
  firstname: z.string().min(1, "Firstname is required"),
  lastname: z.string().min(1, "Lastname is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  cityId: z.string().min(1, "City is required"),
});

const AddUserForm = ({ user_service_url, onUserAdded }) => {
  const [cities, setCities] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const cityUrl = `${API_URL}/city`; 
    axios.get(cityUrl)
      .then(response => setCities(response.data))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      city: { id: parseInt(data.cityId, 10) }
    };
    
    try {
      await axios.post(user_service_url, payload);
      toast.success('User added successfully!');
      reset();
      if (onUserAdded) onUserAdded();
    } catch (e) {
      console.error(e);
      toast.error(e.response?.data || 'Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
      <div className="flex items-center mb-4 text-gray-700">
        <UserPlus size={20} className="mr-2" />
        <h3 className="text-lg font-bold">New User</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Firstname</label>
          <input 
            {...register("firstname")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border" 
            placeholder="John"
          />
          {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Lastname</label>
          <input 
            {...register("lastname")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border" 
            placeholder="Doe"
          />
          {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Address</label>
          <input 
            {...register("address")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border" 
            placeholder="123 Main St"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Phone</label>
          <input 
            {...register("phone")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border" 
            placeholder="555-0123"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">City</label>
          <select 
            {...register("cityId")} 
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm p-2 border bg-white"
          >
            <option value="">Select a city</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>{city.title}</option>
            ))}
          </select>
          {errors.cityId && <p className="text-red-500 text-xs mt-1">{errors.cityId.message}</p>}
        </div>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};

export default AddUserForm;
