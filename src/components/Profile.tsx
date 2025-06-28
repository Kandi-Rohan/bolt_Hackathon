import React, { useState } from 'react';
import { User, MapPin, Edit3, Save, X, Plus, Trash2, Camera, Star, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import BadgeDisplay from './BadgeDisplay';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { reviews } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    city: user?.city || '',
    skills: user?.skills || [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'about' | 'badges' | 'reviews'>('about');

  if (!user) return null;

  // Get user's reviews
  const userReviews = reviews.filter(review => review.toUserId === user.id);

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

  const tabs = [
    { id: 'about', name: 'About', icon: User },
    { id: 'badges', name: 'Badges', icon: Award, count: user.badges.length },
    { id: 'reviews', name: 'Reviews', icon: Star, count: userReviews.length },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-24 sm:h-32 relative">
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
        
        <div className="px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Enhanced Avatar */}
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center relative overflow-hidden">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg sm:text-xl">
                      {getInitials(user.name)}
                    </span>
                  )}
                  
                  {/* Hover overlay for avatar change */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </div>
                
                {/* Online status indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 border-3 border-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="text-center sm:text-left sm:pb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="text-xl sm:text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none text-center sm:text-left"
                  />
                ) : (
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h1>
                )}
                <div className="flex items-center justify-center sm:justify-start text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.city}
                      onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Add your city"
                      className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 text-center sm:text-left"
                    />
                  ) : (
                    <span>{user.city || 'Location not set'}</span>
                  )}
                </div>
                
                {/* Rating and member since */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                  {user.reviewCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(user.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {user.rating.toFixed(1)} ({user.reviewCount} reviews)
                      </span>
                    </div>
                  )}
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end space-x-3">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-lg sm:text-xl font-bold">💰</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{user.timeCredits}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Time Credits</div>
            <div className="text-xs text-gray-500 mt-1">Available to spend</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-lg sm:text-xl font-bold">🤝</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">{user.totalTimeGiven}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Hours Given</div>
            <div className="text-xs text-gray-500 mt-1">Helping others</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10 opacity-50"></div>
          <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-lg sm:text-xl font-bold">📚</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{user.totalTimeReceived}</div>
            <div className="text-gray-600 font-medium text-sm sm:text-base">Hours Received</div>
            <div className="text-xs text-gray-500 mt-1">Learning & growing</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-1 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Bio Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  About Me
                </h3>
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

              {/* Skills Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-white text-xs">🎯</span>
                    </div>
                    Skills & Expertise
                  </h3>
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
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-xs">⚙️</span>
                  </div>
                  Account Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium text-sm">Email</span>
                      <span className="font-semibold text-gray-900 text-sm truncate ml-2">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium text-sm">Member Since</span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium text-sm">User ID</span>
                      <span className="font-mono text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {user.id.slice(0, 8)}...
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <span className="text-gray-600 font-medium text-sm">Account Status</span>
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badges Tab */}
          {activeTab === 'badges' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Achievements</h3>
                <p className="text-gray-600">Badges you've earned by being an active community member</p>
              </div>
              <BadgeDisplay badges={user.badges} showAll={true} />
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Reviews</h3>
                <p className="text-gray-600">What others say about working with you</p>
              </div>
              
              {userReviews.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No reviews yet</p>
                  <p className="text-gray-400 text-sm mt-1">Complete tasks to receive your first review!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {review.fromUserName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.fromUserName}</h4>
                            <p className="text-sm text-gray-600">{review.taskTitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-gray-700 mb-2">"{review.comment}"</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;