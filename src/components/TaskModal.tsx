import React from 'react';
import { X, Star, Clock, Users, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { TaskType } from '../types';
import { useAuth } from '../context/AuthContext';

interface TaskModalProps {
  task: TaskType;
  isOpen: boolean;
  onClose: () => void;
  onRequestHelp: () => void;
  onOfferHelp: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onRequestHelp, onOfferHelp }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white p-6 rounded-t-2xl relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">{task.icon}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{task.name}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                    {task.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4" />
                    <span>{task.credits} Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              What's Included
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{task.detailedDescription}</p>
          </div>

          {/* Time Estimate */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-blue-700">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Estimated Time: {task.estimatedTime}</span>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {task.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Typical Providers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Who Usually Offers This
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {task.typicalProviders.map((provider, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-700 bg-green-50 p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{provider}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Value Explanation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-green-700 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">Credit Value: {task.credits}</span>
            </div>
            <p className="text-sm text-gray-600">
              This credit value reflects the skill level, time investment, and complexity required for this task.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onRequestHelp}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Users className="w-5 h-5" />
                  <span>Request Help</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOfferHelp}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Offer This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Join TimeBank to Participate</h4>
                  <p className="text-gray-600 text-sm">
                    Create an account to request help or offer your skills to the community
                  </p>
                </div>
                <button
                  onClick={onRequestHelp}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <span>Join TimeBank</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;