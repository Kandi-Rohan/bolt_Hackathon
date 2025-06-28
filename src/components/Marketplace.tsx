import React, { useState } from 'react';
import { Plus, Clock, MapPin, Wifi, Search, Filter, Star, Award, ArrowRight, CreditCard, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useSearchParams, Link } from 'react-router-dom';

const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'browse';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  
  const { user } = useAuth();
  const { offers, requests, addOffer, addRequest, createMatch } = useData();

  // Form states
  const [offerForm, setOfferForm] = useState({
    taskType: '',
    description: '',
    credits: 1,
    mode: 'online' as 'online' | 'offline' | 'both',
    location: '',
  });

  const [requestForm, setRequestForm] = useState({
    taskType: '',
    description: '',
    credits: 1,
    mode: 'online' as 'online' | 'offline' | 'both',
    location: '',
  });

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addOffer({
      ...offerForm,
      userId: user.id,
      userName: user.name,
      userCity: user.city || 'Location not set',
      status: 'active',
      isRemote: offerForm.mode === 'online' || offerForm.mode === 'both',
    });

    setOfferForm({
      taskType: '',
      description: '',
      credits: 1,
      mode: 'online',
      location: '',
    });

    alert('Offer posted successfully!');
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (user.timeCredits < requestForm.credits) {
      alert('Insufficient credits! Please buy more credits to post this request.');
      return;
    }

    addRequest({
      ...requestForm,
      userId: user.id,
      userName: user.name,
      userCity: user.city || 'Location not set',
      status: 'active',
      isRemote: requestForm.mode === 'online' || requestForm.mode === 'both',
    });

    setRequestForm({
      taskType: '',
      description: '',
      credits: 1,
      mode: 'online',
      location: '',
    });

    alert('Request posted successfully!');
  };

  const handleConnect = (type: 'offer' | 'request', itemId: string, otherUserId: string) => {
    if (!user) return;
    
    if (type === 'offer') {
      const offer = offers.find(o => o.id === itemId);
      if (offer && user.timeCredits >= offer.credits) {
        createMatch('', itemId, user.id, otherUserId);
        alert('Connection request sent!');
      } else {
        alert('Insufficient credits! Please buy more credits.');
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
                           offer.userCity.toLowerCase().includes(filterLocation.toLowerCase()) ||
                           offer.location?.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesMode = filterMode === 'all' || 
                       (filterMode === 'online' && (offer.mode === 'online' || offer.mode === 'both')) ||
                       (filterMode === 'offline' && (offer.mode === 'offline' || offer.mode === 'both'));
    
    return matchesSearch && matchesLocation && matchesMode;
  });

  const filteredRequests = requests.filter(request => {
    if (request.userId === user?.id) return false;
    
    const matchesSearch = request.taskType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || 
                           request.userCity.toLowerCase().includes(filterLocation.toLowerCase()) ||
                           request.location?.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesMode = filterMode === 'all' || 
                       (filterMode === 'online' && (request.mode === 'online' || request.mode === 'both')) ||
                       (filterMode === 'offline' && (request.mode === 'offline' || request.mode === 'both'));
    
    return matchesSearch && matchesLocation && matchesMode;
  });

  const tabs = [
    { id: 'browse', name: 'Browse Community', count: filteredOffers.length + filteredRequests.length },
    { id: 'offer', name: 'Offer Help', count: null },
    { id: 'request', name: 'Request Help', count: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Skill Marketplace</h1>
            <p className="text-blue-100 text-lg">
              Connect with your community through custom task exchange
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{user?.timeCredits || 0} Credits</span>
            </div>
            <Link
              to="/buy-credits"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Buy Credits</span>
            </Link>
          </div>
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

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Modes</option>
                  <option value="online">Online Only</option>
                  <option value="offline">Offline Only</option>
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
                  {filteredOffers.map((offer) => (
                    <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{offer.taskType}</h3>
                        <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
                          <Star className="w-3 h-3" />
                          <span>{offer.credits} credits</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {offer.location || offer.userCity}
                          </span>
                          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            offer.mode === 'online' ? 'bg-green-100 text-green-700' :
                            offer.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {offer.mode === 'online' && <Wifi className="w-3 h-3 mr-1" />}
                            {offer.mode === 'offline' && <MapPin className="w-3 h-3 mr-1" />}
                            {offer.mode}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          by {offer.userName}
                        </div>
                        <button
                          onClick={() => handleConnect('offer', offer.id, offer.userId)}
                          disabled={!user || user.timeCredits < offer.credits}
                          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {!user || user.timeCredits < offer.credits ? 'Insufficient Credits' : 'Request Help'}
                        </button>
                      </div>
                    </div>
                  ))}
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
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold text-gray-900">{request.taskType}</h3>
                        <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                          <Star className="w-3 h-3" />
                          <span>{request.credits} credits</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {request.location || request.userCity}
                          </span>
                          <span className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            request.mode === 'online' ? 'bg-green-100 text-green-700' :
                            request.mode === 'offline' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {request.mode === 'online' && <Wifi className="w-3 h-3 mr-1" />}
                            {request.mode === 'offline' && <MapPin className="w-3 h-3 mr-1" />}
                            {request.mode}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-400">
                          by {request.userName}
                        </div>
                        <button
                          onClick={() => handleConnect('request', request.id, request.userId)}
                          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors hover:scale-105"
                        >
                          Offer Help
                        </button>
                      </div>
                    </div>
                  ))}
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
                What can you help with?
              </label>
              <input
                id="offer-task-type"
                type="text"
                value={offerForm.taskType}
                onChange={(e) => setOfferForm(prev => ({ ...prev, taskType: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Web Development, Graphic Design, Math Tutoring"
                required
              />
            </div>

            <div>
              <label htmlFor="offer-credits" className="block text-sm font-medium text-gray-700 mb-2">
                Credits to Earn
              </label>
              <input
                id="offer-credits"
                type="number"
                min="1"
                max="50"
                value={offerForm.credits}
                onChange={(e) => setOfferForm(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="offer-mode" className="block text-sm font-medium text-gray-700 mb-2">
                Task Mode
              </label>
              <select
                id="offer-mode"
                value={offerForm.mode}
                onChange={(e) => setOfferForm(prev => ({ ...prev, mode: e.target.value as 'online' | 'offline' | 'both' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both</option>
              </select>
            </div>

            {(offerForm.mode === 'offline' || offerForm.mode === 'both') && (
              <div>
                <label htmlFor="offer-location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="offer-location"
                  type="text"
                  value={offerForm.location}
                  onChange={(e) => setOfferForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your location"
                  required={offerForm.mode === 'offline'}
                />
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Request Help</h2>
            {user && user.timeCredits < requestForm.credits && (
              <div className="flex items-center space-x-2 text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Insufficient credits</span>
                <Link to="/buy-credits" className="text-orange-700 underline text-sm">Buy more</Link>
              </div>
            )}
          </div>
          
          <form onSubmit={handleRequestSubmit} className="space-y-6">
            <div>
              <label htmlFor="request-task-type" className="block text-sm font-medium text-gray-700 mb-2">
                What do you need help with?
              </label>
              <input
                id="request-task-type"
                type="text"
                value={requestForm.taskType}
                onChange={(e) => setRequestForm(prev => ({ ...prev, taskType: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Website Bug Fix, Logo Design, Resume Review"
                required
              />
            </div>

            <div>
              <label htmlFor="request-credits" className="block text-sm font-medium text-gray-700 mb-2">
                Credits to Pay
              </label>
              <input
                id="request-credits"
                type="number"
                min="1"
                max="50"
                value={requestForm.credits}
                onChange={(e) => setRequestForm(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="request-mode" className="block text-sm font-medium text-gray-700 mb-2">
                Task Mode
              </label>
              <select
                id="request-mode"
                value={requestForm.mode}
                onChange={(e) => setRequestForm(prev => ({ ...prev, mode: e.target.value as 'online' | 'offline' | 'both' }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both</option>
              </select>
            </div>

            {(requestForm.mode === 'offline' || requestForm.mode === 'both') && (
              <div>
                <label htmlFor="request-location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  id="request-location"
                  type="text"
                  value={requestForm.location}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your location"
                  required={requestForm.mode === 'offline'}
                />
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

            <button
              type="submit"
              disabled={!requestForm.taskType || (user && user.timeCredits < requestForm.credits)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {user && user.timeCredits < requestForm.credits ? 'Insufficient Credits' : 'Post Request'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Marketplace;