import React from 'react';
import { X, MapPin, Clock, User, Star, Wifi } from 'lucide-react';
import { Offer, Request } from '../types';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Offer | Request | null;
  type: 'offer' | 'request';
  onConnect?: (taskId: string, otherUserId: string, otherUserName: string, taskTitle: string, credits: number) => void;
  currentUserId?: string;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  type,
  onConnect,
  currentUserId
}) => {
  if (!isOpen || !task) return null;

  const handleConnect = () => {
    if (onConnect && currentUserId !== task.userId) {
      onConnect(task.id, task.userId, task.userName, task.taskType, task.credits);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Task Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Task Header */}
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{task.taskType}</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{task.userName}</span>
              </div>
              <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-700">{task.credits} credits</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Description</h5>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Mode</h5>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                task.mode === 'online' ? 'bg-green-100 text-green-700' :
                task.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {task.mode === 'online' && <Wifi className="w-4 h-4" />}
                {task.mode === 'offline' && <MapPin className="w-4 h-4" />}
                <span className="capitalize font-medium">{task.mode}</span>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-2">Location</h5>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{task.location || task.userCity}</span>
              </div>
            </div>
          </div>

          {/* Posted Date */}
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Posted</h5>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{new Date(task.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          {/* Action Button */}
          {currentUserId && currentUserId !== task.userId && task.status === 'open' && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleConnect}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                  type === 'offer' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                }`}
              >
                {type === 'offer' ? 'Request Help' : 'Offer Help'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;