import React, { useState } from 'react';
import { Plus, Clock, MapPin, Wifi, Search, Filter, Star, Award, ArrowRight, CreditCard, AlertCircle, User, MessageCircle, Code, Palette, BookOpen, Briefcase, PenTool, Heart, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useSearchParams, Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import TaskStatusBadge from './TaskStatusBadge';
import ReviewModal from './ReviewModal';
import TaskDetailModal from './TaskDetailModal';

const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'browse';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterMode, setFilterMode] = useState('all');
  const [selectedTask, setSelectedTask] = useState<{ task: any; type: 'offer' | 'request' } | null>(null);
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    taskId: string;
    taskTitle: string;
    recipientId: string;
    recipientName: string;
    type: 'helper' | 'requester';
  } | null>(null);
  
  const { user, awardBadges } = useAuth();
  const { offers, requests, addOffer, addRequest, createMatch, matches, addReview, markTaskCompleted, addTransaction } = useData();
  const { showSuccess, showError, showInfo } = useToast();

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Task category icons mapping
  const getTaskIcon = (taskType: string) => {
    const type = taskType.toLowerCase();
    if (type.includes('code') || type.includes('programming') || type.includes('development') || type.includes('web') || type.includes('app')) {
      return { icon: Code, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-100', text: 'text-blue-700' };
    }
    if (type.includes('design') || type.includes('logo') || type.includes('ui') || type.includes('ux') || type.includes('graphic')) {
      return { icon: Palette, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-100', text: 'text-purple-700' };
    }
    if (type.includes('tutor') || type.includes('teach') || type.includes('education') || type.includes('learn') || type.includes('math') || type.includes('language')) {
      return { icon: BookOpen, color: 'from-green-500 to-green-600', bg: 'bg-green-100', text: 'text-green-700' };
    }
    if (type.includes('business') || type.includes('consulting') || type.includes('marketing') || type.includes('career') || type.includes('resume')) {
      return { icon: Briefcase, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-100', text: 'text-orange-700' };
    }
    if (type.includes('writing') || type.includes('content') || type.includes('article') || type.includes('copy') || type.includes('translation')) {
      return { icon: PenTool, color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-100', text: 'text-indigo-700' };
    }
    if (type.includes('fitness') || type.includes('health') || type.includes('cooking') || type.includes('music') || type.includes('life')) {
      return { icon: Heart, color: 'from-pink-500 to-pink-600', bg: 'bg-pink-100', text: 'text-pink-700' };
    }
    // Default icon
    return { icon: Star, color: 'from-gray-500 to-gray-600', bg: 'bg-gray-100', text: 'text-gray-700' };
  };

  // Empty state SVG component
  const EmptyStateIllustration = ({ type }: { type: 'offers' | 'requests' | 'tasks' }) => (
    <div className="text-center py-8 sm:py-12">
      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <span className="text-4xl sm:text-5xl">
          {type === 'offers' && '🤝'}
          {type === 'requests' && '🙋‍♂️'}
          {type === 'tasks' && '📋'}
        </span>
      </div>
      <p className="text-gray-500 font-medium text-lg mb-2">
        {type === 'offers' && '🪄 No help offers available'}
        {type === 'requests' && '🪄 No help requests found'}
        {type === 'tasks' && '🪄 No accepted tasks yet'}
      </p>
      <p className="text-gray-400 text-sm">
        {type === 'offers' && 'Be the first to offer your skills to the community!'}
        {type === 'requests' && 'Try adjusting your search criteria or check back later'}
        {type === 'tasks' && 'Browse the community to find tasks you can help with'}
      </p>
    </div>
  );

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const validateOfferForm = () => {
    if (!offerForm.taskType.trim()) {
      showError('Validation Error', 'Task type is required');
      return false;
    }
    if (!offerForm.description.trim()) {
      showError('Validation Error', 'Description is required');
      return false;
    }
    if (offerForm.credits <= 0) {
      showError('Validation Error', 'Credits must be greater than 0');
      return false;
    }
    if (offerForm.mode === 'offline' && !offerForm.location.trim()) {
      showError('Validation Error', 'Location is required for offline tasks');
      return false;
    }
    return true;
  };

  const validateRequestForm = () => {
    if (!requestForm.taskType.trim()) {
      showError('Validation Error', 'Task type is required');
      return false;
    }
    if (!requestForm.description.trim()) {
      showError('Validation Error', 'Description is required');
      return false;
    }
    if (requestForm.credits <= 0) {
      showError('Validation Error', 'Credits must be greater than 0');
      return false;
    }
    if (requestForm.mode === 'offline' && !requestForm.location.trim()) {
      showError('Validation Error', 'Location is required for offline tasks');
      return false;
    }
    return true;
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !validateOfferForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      addOffer({
        ...offerForm,
        userId: user.id,
        userName: user.name,
        userCity: user.city || 'Location not set',
        status: 'open',
        isRemote: offerForm.mode === 'online' || offerForm.mode === 'both',
      });

      setOfferForm({
        taskType: '',
        description: '',
        credits: 1,
        mode: 'online',
        location: '',
      });

      showSuccess('✅ Offer Posted!', 'Your help offer has been posted successfully.');
      setActiveTab('browse'); // Switch to browse tab to see the posted offer
    } catch (error) {
      showError('Error', 'Failed to post offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !validateRequestForm()) return;

    if (user.timeCredits < requestForm.credits) {
      showError('Insufficient Credits', 'Please buy more credits to post this request.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      addRequest({
        ...requestForm,
        userId: user.id,
        userName: user.name,
        userCity: user.city || 'Location not set',
        status: 'open',
        isRemote: requestForm.mode === 'online' || requestForm.mode === 'both',
      });

      setRequestForm({
        taskType: '',
        description: '',
        credits: 1,
        mode: 'online',
        location: '',
      });

      showSuccess('✅ Request Posted!', 'Your help request has been posted successfully.');
      setActiveTab('browse'); // Switch to browse tab to see the posted request
    } catch (error) {
      showError('Error', 'Failed to post request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = (type: 'offer' | 'request', itemId: string, otherUserId: string, otherUserName: string, taskTitle: string, credits: number) => {
    if (!user) return;
    
    if (type === 'offer') {
      const offer = offers.find(o => o.id === itemId);
      if (offer && user.timeCredits >= offer.credits) {
        createMatch('', itemId, user.id, otherUserId);
        showSuccess('✅ Task Accepted', `You'll earn ${credits} credits when completed!`);
      } else {
        showError('Insufficient Credits', 'Please buy more credits to request this help.');
      }
    } else {
      const request = requests.find(r => r.id === itemId);
      if (request) {
        createMatch(itemId, '', otherUserId, user.id);
        showSuccess('✅ Offer Sent', `Your offer to help ${otherUserName} has been sent!`);
      }
    }
    setSelectedTask(null); // Close modal
  };

  const handleCompleteTask = (taskId: string, type: 'offer' | 'request', recipientId: string, recipientName: string, taskTitle: string) => {
    markTaskCompleted(taskId, type);
    
    // Open review modal
    setReviewModal({
      isOpen: true,
      taskId,
      taskTitle,
      recipientId,
      recipientName,
      type: type === 'offer' ? 'requester' : 'helper'
    });

    // Award badges and add transaction
    if (type === 'offer') {
      const offer = offers.find(o => o.id === taskId);
      if (offer) {
        addTransaction({
          fromUserId: recipientId,
          toUserId: user!.id,
          amount: offer.credits,
          taskType: offer.taskType,
          description: `Earned credits for: ${offer.taskType}`,
          type: 'earned'
        });

        // Check for new badges
        const newBadges = awardBadges(user!.totalTimeGiven + 1, user!.timeCredits + offer.credits);
        if (newBadges.length > 0) {
          showSuccess('🏆 Badge Earned!', `You earned ${newBadges.length} new badge${newBadges.length > 1 ? 's' : ''}!`);
        }
      }
    }

    showSuccess('✅ Task Completed', 'Great job! Please leave a review for your experience.');
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (!reviewModal || !user) return;

    addReview({
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: reviewModal.recipientId,
      taskId: reviewModal.taskId,
      taskTitle: reviewModal.taskTitle,
      rating,
      comment,
      type: reviewModal.type
    });

    showSuccess('Review Submitted', 'Thank you for your feedback!');
    setReviewModal(null);
  };

  // Get user's posted offers and requests
  const userOffers = offers.filter(offer => offer.userId === user?.id);
  const userRequests = requests.filter(request => request.userId === user?.id);

  // Get user's accepted requests (where they are the helper)
  const userAcceptedRequests = matches
    .filter(match => match.helperId === user?.id && match.status === 'accepted')
    .map(match => {
      const request = requests.find(r => r.id === match.requestId);
      return request ? { ...request, matchId: match.id } : null;
    })
    .filter(Boolean);

  // Filter logic - only show open tasks
  const filteredOffers = offers.filter(offer => {
    if (offer.userId === user?.id || offer.status !== 'open') return false;
    
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
    if (request.userId === user?.id || request.status !== 'open') return false;
    
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
    { id: 'my-posts', name: 'My Posts', count: userOffers.length + userRequests.length },
    { id: 'accepted', name: 'Accepted Tasks', count: userAcceptedRequests.length },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-4 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Skill Marketplace</h1>
            <p className="text-blue-100 text-base sm:text-lg">
              Connect with your community through custom task exchange
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl px-3 sm:px-4 py-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">{user?.timeCredits || 0} Credits</span>
            </div>
            <Link
              to="/buy-credits"
              className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm sm:text-base"
            >
              <CreditCard className="w-4 h-4" />
              <span>Buy Credits</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg shadow-sm overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center justify-center space-x-2 py-2 sm:py-3 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="whitespace-nowrap">{tab.name}</span>
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

      {/* My Posts Tab */}
      {activeTab === 'my-posts' && (
        <div className="space-y-6">
          {/* My Offers */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">My Offers</h2>
              <p className="text-gray-600 text-sm mt-1">Help you're offering to the community</p>
            </div>
            <div className="p-4 sm:p-6">
              {userOffers.length === 0 ? (
                <EmptyStateIllustration type="offers" />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {userOffers.map((offer) => {
                    const taskIconData = getTaskIcon(offer.taskType);
                    const TaskIcon = taskIconData.icon;
                    
                    return (
                      <div 
                        key={offer.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedTask({ task: offer, type: 'offer' })}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${taskIconData.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <TaskIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 truncate">{offer.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <TaskStatusBadge status={offer.status} size="sm" />
                            <span className="text-green-600 font-medium text-sm">{offer.credits} credits</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{offer.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{offer.location || offer.userCity}</span>
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* My Requests */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">My Requests</h2>
              <p className="text-gray-600 text-sm mt-1">Help you're seeking from the community</p>
            </div>
            <div className="p-4 sm:p-6">
              {userRequests.length === 0 ? (
                <EmptyStateIllustration type="requests" />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {userRequests.map((request) => {
                    const taskIconData = getTaskIcon(request.taskType);
                    const TaskIcon = taskIconData.icon;
                    
                    return (
                      <div 
                        key={request.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedTask({ task: request, type: 'request' })}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${taskIconData.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <TaskIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 truncate">{request.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <TaskStatusBadge status={request.status} size="sm" />
                            <span className="text-purple-600 font-medium text-sm">{request.credits} credits</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{request.location || request.userCity}</span>
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accepted Tasks Tab */}
      {activeTab === 'accepted' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Tasks You've Accepted</h2>
              <p className="text-gray-600 text-sm mt-1">Requests you've agreed to help with</p>
            </div>
            <div className="p-4 sm:p-6">
              {userAcceptedRequests.length === 0 ? (
                <EmptyStateIllustration type="tasks" />
              ) : (
                <div className="space-y-4">
                  {userAcceptedRequests.map((request) => {
                    const taskIconData = getTaskIcon(request.taskType);
                    const TaskIcon = taskIconData.icon;
                    
                    return (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${taskIconData.color} rounded-xl flex items-center justify-center shadow-md`}>
                              <TaskIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-gray-900 truncate">{request.taskType}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">Requested by: <strong>{request.userName}</strong></span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <TaskStatusBadge status={request.status} size="sm" />
                            <span className="text-green-600 font-medium text-sm">{request.credits} credits</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{request.description}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="truncate">{request.location || request.userCity}</span>
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
                          
                          <div className="flex space-x-2">
                            <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>Contact</span>
                            </button>
                            {request.status === 'in_progress' && (
                              <button
                                onClick={() => handleCompleteTask(request.id, 'request', request.userId, request.userName, request.taskType)}
                                className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Complete</span>
                              </button>
                            )}
                          </div>
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

      {/* Browse Tab */}
      {activeTab === 'browse' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              
              <div className="relative sm:col-span-2 lg:col-span-1">
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
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Available Help Offers</h2>
              <p className="text-gray-600 text-sm mt-1">People ready to share their skills</p>
            </div>
            <div className="p-4 sm:p-6">
              {filteredOffers.length === 0 ? (
                <EmptyStateIllustration type="offers" />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredOffers.map((offer) => {
                    const taskIconData = getTaskIcon(offer.taskType);
                    const TaskIcon = taskIconData.icon;
                    
                    return (
                      <div 
                        key={offer.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedTask({ task: offer, type: 'offer' })}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${taskIconData.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <TaskIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 truncate">{offer.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium flex-shrink-0 ml-2">
                            <Star className="w-3 h-3" />
                            <span>{offer.credits}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{offer.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{offer.location || offer.userCity}</span>
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
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400 truncate">
                            by {offer.userName}
                          </div>
                          <div className="text-xs text-blue-600 font-medium">
                            Click to view details
                          </div>
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
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Help Requests</h2>
              <p className="text-gray-600 text-sm mt-1">People looking for assistance</p>
            </div>
            <div className="p-4 sm:p-6">
              {filteredRequests.length === 0 ? (
                <EmptyStateIllustration type="requests" />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredRequests.map((request) => {
                    const taskIconData = getTaskIcon(request.taskType);
                    const TaskIcon = taskIconData.icon;
                    
                    return (
                      <div 
                        key={request.id} 
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                        onClick={() => setSelectedTask({ task: request, type: 'request' })}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className={`w-10 h-10 bg-gradient-to-r ${taskIconData.color} rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <TaskIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-semibold text-gray-900 truncate">{request.taskType}</h3>
                          </div>
                          <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium flex-shrink-0 ml-2">
                            <Star className="w-3 h-3" />
                            <span>{request.credits}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{request.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="truncate">{request.location || request.userCity}</span>
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
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400 truncate">
                            by {request.userName}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Click to view details
                          </div>
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
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Offer Your Help</h2>
          
          <form onSubmit={handleOfferSubmit} className="space-y-6">
            <div>
              <label htmlFor="offer-task-type" className="block text-sm font-medium text-gray-700 mb-2">
                What can you help with? *
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
                Credits to Earn *
              </label>
              <input
                id="offer-credits"
                type="number"
                min="1"
                max="50"
                value={offerForm.credits}
                onChange={(e) => setOfferForm(prev => ({ ...prev, credits: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="offer-mode" className="block text-sm font-medium text-gray-700 mb-2">
                Task Mode *
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
                  Location {offerForm.mode === 'offline' && '*'}
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
                Description *
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
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting Offer...
                </div>
              ) : (
                'Post Offer'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Request Help Tab */}
      {activeTab === 'request' && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-2 sm:space-y-0">
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
                What do you need help with? *
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
                Credits to Pay *
              </label>
              <input
                id="request-credits"
                type="number"
                min="1"
                max="50"
                value={requestForm.credits}
                onChange={(e) => setRequestForm(prev => ({ ...prev, credits: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="request-mode" className="block text-sm font-medium text-gray-700 mb-2">
                Task Mode *
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
                  Location {requestForm.mode === 'offline' && '*'}
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
                Description *
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
              disabled={isSubmitting || (user && user.timeCredits < requestForm.credits)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting Request...
                </div>
              ) : user && user.timeCredits < requestForm.credits ? (
                'Insufficient Credits'
              ) : (
                'Post Request'
              )}
            </button>
          </form>
        </div>
      )}

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={selectedTask !== null}
        onClose={() => setSelectedTask(null)}
        task={selectedTask?.task || null}
        type={selectedTask?.type || 'offer'}
        onConnect={handleConnect}
        currentUserId={user?.id}
      />

      {/* Review Modal */}
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal.isOpen}
          onClose={() => setReviewModal(null)}
          onSubmit={handleReviewSubmit}
          taskTitle={reviewModal.taskTitle}
          recipientName={reviewModal.recipientName}
          type={reviewModal.type}
        />
      )}
    </div>
  );
};

export default Marketplace;