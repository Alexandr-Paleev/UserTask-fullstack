import React from 'react';
import { Trash2, MapPin, Clock, User, Calendar } from 'lucide-react';

const TaskList = ({ tasks, onDelete }) => {
  const handleDeleteClick = (task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?\n\nThis action cannot be undone.`
    );
    if (confirmed) {
      onDelete(task.id);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
        <Calendar size={48} className="mb-2 opacity-20" />
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
        {tasks.map(task => (
        <li key={task.id} className="group bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-green-500">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
               <h3 className="text-lg font-bold text-gray-900 mb-1">{task.title}</h3>
               <p className="text-sm text-gray-600 mb-3 leading-relaxed">{task.description}</p>
               
               <div className="flex flex-wrap gap-2 text-xs">
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                   <MapPin size={12} className="mr-1.5" />
                   {task.address}
                 </span>
                 
                 {(task.startTime || task.endTime) && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                     <Clock size={12} className="mr-1.5" />
                     {task.startTime} - {task.endTime}
                   </span>
                 )}
               </div>

               {task.user && (
                 <div className="mt-3 pt-3 border-t border-gray-50 flex items-center">
                   <User size={14} className="text-gray-400 mr-2" />
                   <span className="text-xs text-gray-500 font-medium">Assigned to:</span>
                   <span className="ml-1 text-xs text-indigo-600 font-bold">
                     {task.user.firstname} {task.user.lastname}
                   </span>
                 </div>
               )}
            </div>
            
            <button 
              onClick={() => handleDeleteClick(task)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
              title="Delete Task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </li>
        ))}
      </ul>
  );
};

export default TaskList;
