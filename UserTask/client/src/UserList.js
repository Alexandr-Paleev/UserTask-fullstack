import React from 'react';
import { MapPin, Phone, Building2, User, Trash2 } from 'lucide-react';

const UserList = ({ users, onDelete }) => {
  const handleDeleteClick = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.firstname} ${user.lastname}"?\n\nThis will also delete all tasks assigned to this user.`
    );
    if (confirmed) {
      onDelete(user.id);
    }
  };

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <User size={48} className="mb-2 opacity-20" />
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start space-x-4">
             {/* Avatar */}
             <div className="flex-shrink-0">
               <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-sm">
                 {user.firstname.charAt(0)}{user.lastname.charAt(0)}
               </span>
             </div>
             
             {/* Content */}
             <div className="flex-1 min-w-0">
               <div className="flex justify-between items-center mb-1">
                 <h3 className="text-lg font-bold text-gray-900 truncate">
                   {user.firstname} {user.lastname}
                 </h3>
                 <div className="flex items-center gap-2">
                   <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                     ID: {user.id}
                   </span>
                   {onDelete && (
                     <button
                       onClick={() => handleDeleteClick(user)}
                       className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                       title="Delete User"
                     >
                       <Trash2 size={16} />
                     </button>
                   )}
                 </div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                 <div className="flex items-center text-sm text-gray-500">
                   <MapPin size={16} className="mr-2 text-gray-400" />
                   <span className="truncate">{user.address}</span>
                 </div>
                 <div className="flex items-center text-sm text-gray-500">
                   <Phone size={16} className="mr-2 text-gray-400" />
                   <span className="truncate">{user.phone}</span>
                 </div>
                 {user.city && (
                   <div className="flex items-center text-sm text-indigo-600 font-medium sm:col-span-2">
                     <Building2 size={16} className="mr-2" />
                     {user.city.title}
                   </div>
                 )}
               </div>
             </div>
            </div>
          </li>
        ))}
      </ul>
  );
};

export default UserList;
