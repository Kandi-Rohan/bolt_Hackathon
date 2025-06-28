import React, { useState } from 'react';
import { Plus, Clock, MapPin, Wifi, Search, Filter, Star, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useSearchParams } from 'react-router-dom';
import { taskTypes, getTaskTypeById, getAllCategories } from '../data/taskTypes';
import TaskModal from './TaskModal';

const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'tasks';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterRemote, setFilterRemote] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { user } = useAuth();
  const { offers, requests, addOffer, addRequest, createMatch } = useData();

  // Form states
  const [offerForm, setOfferForm] = useState({
    taskType: '',
    customTask: '',
    description: '',
    credits: 0,
    isRemote: false,
  });

  const [requestForm, setRequestForm] = useState({
    taskType: '',
    customTask: '',
    description: '',
    credits: 0,
    isRemote: false,
  });

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleRequestHelp = () => {
    if (selectedTask) {
      setRequestForm(prev => ({
        ...prev,
        taskType: selectedTask.id,
        credits: selectedTask.credits
      }));
      setActiveTab('request');
      handleModalClose();
    }
  };

  const handleOfferHelp = () => {
    if (selectedTask) {
      setOfferForm(prev => ({
        ...prev,
        taskType: selectedTask.id,
        credits: selectedTask.credits
      }));
      setActiveTab('offer');
      handleModalClose();
    }
  };

  const handleTaskTypeChange = (taskTypeId: string, isOffer: boolean) => {
    const taskType = getTaskTypeById(taskTypeId);
    const credits = taskType ? taskType.credits : 0;
    
    if (isOffer) {
      setOfferForm(prev => ({
        ...prev,
        taskType: taskTypeId,
        credits,
        customTask: taskTypeId === 'custom' ? prev.customTask : ''
      }));
    } else {
      setRequestForm(prev => ({
        ...prev,
        taskType: taskTypeId,
        credits,
        customTask: taskTypeId === 'custom' ? prev.customTask : ''
      }));
    }
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const taskType = getTaskTypeById(offerForm.taskType);
    const finalTaskName = offerForm.taskType === 'custom' ? offerForm.customTask : (taskType?.name || '');

    addOffer({
      ...offerForm,
      taskType: finalTaskName,
      userId: user.id,
      userName: user.name,
      userCity: user.city || 'Location not set',
      status: 'active',
    });

    setOfferForm({
      taskType: '',
      customTask: '',
      description: '',
      credits: 0,
      isRemote: false,
    });

    alert('Offer posted successfully!');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const taskType = getTaskTypeById(requestForm.taskType);
    const finalTaskName = requestForm.taskType === 'custom' ? requestForm.customTask : (taskType?.name || '');

    addRequest({
      ...requestForm,
      taskType: finalTaskName,
      userId: user.id,
      userName: user.name,
      userCity: user.city || 'Location not set',
      status: 'active',
    });

    setRequestForm({
      taskType: '',
      customTask: '',
      description: '',
      credits: 0,
      isRemote: false,
    });

    alert('Request posted successfully!');
  };

  const handleConnect = (type: 'offer' | 'request', itemId: string, otherUserId: string) => {
    if (!user) return;
    
    if (type === 'offer') {
      const offer = offers.find(o => o.id === itemId);
      if (offer) {
        createMatch('', itemId, user.id, otherUserId);
        alert('Connection request sent!');
      }
    } else {
      const request = requests.find(r => r.id === itemId);
      if (request) {
        createMatch(itemId, '', otherUserId, user.id);
        alert('Offer to help sent!');
      }
    }
  };

  // Filter logic
  const filteredOffers = offers.filter(offer => {
    if (offer.userId === user?.id) return false;
    
    const matchesSearch = offer.taskType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || 
                           offer.userCity.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesRemote = filterRemote === 'all' || 
                         (filterRemote === 'remote' && offer.isRemote) ||
                         (filterRemote === 'local' && !offer.isRemote);
    
    const taskType = taskTypes.find(t => t.name === offer.taskType);
    const matchesCategory = filterCategory === 'all' || 
                           (taskType && taskType.category === filterCategory);
    
    return matchesSearch && matchesLocation && matchesRemote && matchesCategory;
  });

  const filteredRequests = requests.filter(request => {
    if (request.userId === user?.id) return false;
    
    const matchesSearch = request.taskType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || 
                           request.userCity.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesRemote = filterRemote === 'all' || 
                         (filterRemote === 'remote' && request.isRemote) ||
                         (filterRemote === 'local' && !request.isRemote);
    
    const taskType = taskTypes.find(t => t.name === request.taskType);
    const matchesCategory = filterCategory === 'all' || 
                           (taskType && taskType.category === filterCategory);
    
    return matchesSearch && matchesLocation && matchesRemote && matchesCategory;
  });

  // Filter tasks for search
  const filteredTasks = taskTypes.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const tabs = [
    { id: 'tasks', name: 'Browse Tasks', count: taskTypes.length },
    { id: 'browse', name: 'Community', count: filteredOffers.length + filteredRequests.length },
    { id: 'offer', name: 'Offer Help', count: null },
    { id: 'request', name: 'Request Help', count: null },
  ];

  const categories = getAllCategories();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Skill Marketplace</h1>
          <p className="text-blue-100 text-lg">
            Connect with your community through task-based time exchange
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span>{tab.name}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task Types Tab - Make this the default */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Task Types</h2>
              <p className="text-gray-600">Click on any task to see detailed information and get started</p>
            </div>
            
            {categories.map(category => {
              const categoryTasks = filteredTasks.filter(task => task.category === category);
              
              if (categoryTasks.length === 0) return null;
              
              return (
                <div key={category} className="mb-10">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <Award className="w-6 h-6 mr-3 text-blue-600" />
                    {category}
                    <span className="ml-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {categoryTasks.length} tasks
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTasks.map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => handleTaskClick(task)}
                        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <span className="text-2xl">{task.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{task.name}</h4>
                              <p className="text-sm text-gray-500">{task.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                            <Star className="w-4 h-4" />
                            <span>{task.credits}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {task.estimatedTime}
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-blue-600 group-hover:text-purple-600 transition-colors">
                              Click for details →
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* No Results */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}

            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Ready to start earning or spending credits?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('offer')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Offer Help</span>
                </button>
                <button
                  onClick={() => setActiveTab('request')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
                >
                  <Star className="w-4 h-4" />
                  <span>Request Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterRemote}
                  onChange={(e) => setFilterRemote(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="remote">Remote Only</option>
                  <option value="local">Local Only</option>
                </select>
              </div>
            </div>
          </div>

          {/* Offers Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Available Help Offers</h2>
              <p className="text-gray-600 text-sm mt-1">People ready to share their skills</p>
            </div>
            <div className="p-6">
              {filteredOffers.length === 0 ? (
                <div className="text-center py-8">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No offers match your filters</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredOffers.map((offer) => {
                    const taskType = taskTypes.find(t => t.name === offer.taskType);
                    return (
                      <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            {taskType && <span className="text-xl">{taskType.icon}</span>}
                            <h3 className="font-semibold text-gray-900">{offer.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                            <Star className="w-3 h-3" />
                            <span>{offer.credits} credits</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {offer.userCity}
                            </span>
                            {offer.isRemote && (
                              <span className="flex items-center text-green-600">
                                <Wifi className="w-4 h-4 mr-1" />
                                Remote
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleConnect('offer', offer.id, offer.userId)}
                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors hover:scale-105"
                          >
                            Request Help
                          </button>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-400">
                          by {offer.userName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Requests Section */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Help Requests</h2>
              <p className="text-gray-600 text-sm mt-1">People looking for assistance</p>
            </div>
            <div className="p-6">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No requests match your filters</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredRequests.map((request) => {
                    const taskType = taskTypes.find(t => t.name === request.taskType);
                    return (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-2">
                            {taskType && <span className="text-xl">{taskType.icon}</span>}
                            <h3 className="font-semibold text-gray-900">{request.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                            <Star className="w-3 h-3" />
                            <span>{request.credits} credits</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {request.userCity}
                            </span>
                            {request.isRemote && (
                              <span className="flex items-center text-green-600">
                                <Wifi className="w-4 h-4 mr-1" />
                                Remote
                              </span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleConnect('request', request.id, request.userId)}
                            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors hover:scale-105"
                          >
                            Offer Help
                          </button>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-400">
                          by {request.userName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Offer Help Tab */}
      {activeTab === 'offer' && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Offer Your Help</h2>
          
          <form onSubmit={handleOfferSubmit} className="space-y-6">
            <div>
              <label htmlFor="offer-task-type" className="block text-sm font-medium text-gray-700 mb-2">
                Task Type
              </label>
              <select
                id="offer-task-type"
                value={offerForm.taskType}
                onChange={(e) => handleTaskTypeChange(e.target.value, true)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a task type</option>
                {categories.map(category => (
                  <optgroup key={category} label={category}>
                    {taskTypes.filter(task => task.category === category).map(task => (
                      <option key={task.id} value={task.id}>
                        {task.icon} {task.name} ({task.credits} credits)
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="custom">🔧 Custom Task</option>
              </select>
            </div>

            {offerForm.taskType === 'custom' && (
              <div>
                <label htmlFor="offer-custom-task" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Task Name
                </label>
                <input
                  id="offer-custom-task"
                  type="text"
                  value={offerForm.customTask}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, customTask: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter custom task name"
                  required
                />
              </div>
            )}

            {offerForm.taskType === 'custom' && (
              <div>
                <label htmlFor="offer-credits" className="block text-sm font-medium text-gray-700 mb-2">
                  Credits to Earn
                </label>
                <input
                  id="offer-credits"
                  type="number"
                  min="1"
                  max="20"
                  value={offerForm.credits}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {offerForm.taskType && offerForm.taskType !== 'custom' && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">You will earn {offerForm.credits} credits for this task</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="offer-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="offer-description"
                value={offerForm.description}
                onChange={(e) => setOfferForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe what you can help with, your experience, and any requirements..."
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="offer-remote"
                type="checkbox"
                checked={offerForm.isRemote}
                onChange={(e) => setOfferForm(prev => ({ ...prev, isRemote: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="offer-remote" className="ml-2 text-sm text-gray-700">
                Available for remote help
              </label>
            </div>

            <button
              type="submit"
              disabled={!offerForm.taskType}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              Post Offer
            </button>
          </form>
        </div>
      )}

      {/* Request Help Tab */}
      {activeTab === 'request' && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Help</h2>
          
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            <div>
              <label htmlFor="request-task-type" className="block text-sm font-medium text-gray-700 mb-2">
                Task Type
              </label>
              <select
                id="request-task-type"
                value={requestForm.taskType}
                onChange={(e) => handleTaskTypeChange(e.target.value, false)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a task type</option>
                {categories.map(category => (
                  <optgroup key={category} label={category}>
                    {taskTypes.filter(task => task.category === category).map(task => (
                      <option key={task.id} value={task.id}>
                        {task.icon} {task.name} ({task.credits} credits)
                      </option>
                    ))}
                  </optgroup>
                ))}
                <option value="custom">🔧 Custom Task</option>
              </select>
            </div>

            {requestForm.taskType === 'custom' && (
              <div>
                <label htmlFor="request-custom-task" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Task Name
                </label>
                <input
                  id="request-custom-task"
                  type="text"
                  value={requestForm.customTask}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, customTask: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter custom task name"
                  required
                />
              </div>
            )}

            {requestForm.taskType === 'custom' && (
              <div>
                <label htmlFor="request-credits" className="block text-sm font-medium text-gray-700 mb-2">
                  Credits to Pay
                </label>
                <input
                  id="request-credits"
                  type="number"
                  min="1"
                  max="20"
                  value={requestForm.credits}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {requestForm.taskType && requestForm.taskType !== 'custom' && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-purple-700">
                  <Star className="w-5 h-5" />
                  <span className="font-medium">This will cost {requestForm.credits} credits</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="request-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="request-description"
                value={requestForm.description}
                onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe what you need help with, your current level, and any specific requirements..."
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="request-remote"
                type="checkbox"
                checked={requestForm.isRemote}
                onChange={(e) => setRequestForm(prev => ({ ...prev, isRemote: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="request-remote" className="ml-2 text-sm text-gray-700">
                Open to remote help
              </label>
            </div>

            <button
              type="submit"
              disabled={!requestForm.taskType}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              Post Request
            </button>
          </form>
        </div>
      )}

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onRequestHelp={handleRequestHelp}
          onOfferHelp={handleOfferHelp}
        />
      )}
    </div>
  );
};

export default Marketplace;