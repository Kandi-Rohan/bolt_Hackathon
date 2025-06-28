import React, { useState } from 'react';
import { User, MapPin, Edit3, Save, X, Plus, Trash2, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    city: user?.city || '',
    skills: user?.skills || [],
  });
  const [newSkill, setNewSkill] = useState('');

  if (!user) return null;

  // Generate avatar with user initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      bio: user.bio,
      city: user.city,
      skills: user.skills,
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-32 relative">
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 bg-black/10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16">
            <div className="flex items-end space-x-4">
              {/* Enhanced Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {getInitials(user.name)}
                    </span>
                  )}
                  
                  {/* Hover overlay for avatar change */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Online status indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="pb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                )}
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Add your city"
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    <span>{user.city || 'Location not set'}</span>
                  )}
                </div>
                
                {/* Member since badge */}
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">💰</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{user.timeCredits}</div>
            <div className="text-gray-600 font-medium">Time Credits</div>
            <div className="text-xs text-gray-500 mt-1">Available to spend</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">🤝</span>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{user.totalTimeGiven}</div>
            <div className="text-gray-600 font-medium">Hours Given</div>
            <div className="text-xs text-gray-500 mt-1">Helping others</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-xl font-bold">📚</span>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">{user.totalTimeReceived}</div>
            <div className="text-gray-600 font-medium">Hours Received</div>
            <div className="text-xs text-gray-500 mt-1">Learning & growing</div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          About Me
        </h2>
        {isEditing ? (
          <textarea
            value={editForm.bio}
            onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Tell the community about yourself, your interests, and what you're passionate about..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        ) : (
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-100">
            <p className="text-gray-700 leading-relaxed">
              {user.bio || (
                <span className="text-gray-500 italic">
                  No bio added yet. Click edit to add information about yourself! ✨
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Skills Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">🎯</span>
            </div>
            Skills & Expertise
          </h2>
          {!isEditing && editForm.skills.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {editForm.skills.length} skill{editForm.skills.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        {isEditing && (
          <div className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {editForm.skills.length === 0 ? (
            <div className="w-full text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <p className="text-gray-500 font-medium">No skills added yet</p>
              <p className="text-gray-400 text-sm mt-1">
                {isEditing ? 'Add your first skill above' : 'Click edit to add your skills'}
              </p>
            </div>
          ) : (
            editForm.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <span className="mr-1">⭐</span>
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-1 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white text-sm">⚙️</span>
          </div>
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Email</span>
              <span className="font-semibold text-gray-900">{user.email}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">Member Since</span>
              <span className="font-semibold text-gray-900">
                {new Date(user.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 font-medium">User ID</span>
              <span className="font-mono text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                {user.id.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <span className="text-gray-600 font-medium">Account Status</span>
              <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;