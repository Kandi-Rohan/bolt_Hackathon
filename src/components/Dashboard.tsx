import React from 'react';
import { Clock, Plus, TrendingUp, Users, Award, ArrowRight, Star, Zap, BookOpen, Shield, Megaphone, Gift, Video, FileText, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { taskTypes } from '../data/taskTypes';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { offers, requests, transactions } = useData();

  if (!user) return null;

  const userOffers = offers.filter(offer => offer.userId === user.id);
  const userRequests = requests.filter(request => request.userId === user.id);
  const userTransactions = transactions.filter(
    transaction => transaction.fromUserId === user.id || transaction.toUserId === user.id
  );

  // Calculate credits earned this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const creditsEarnedThisWeek = userTransactions
    .filter(t => t.type === 'earned' && new Date(t.createdAt) >= oneWeekAgo)
    .reduce((sum, t) => sum + t.amount, 0);

  const stats = [
    {
      name: 'Time Credits',
      value: user.timeCredits,
      icon: Clock,
      color: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      name: 'Active Offers',
      value: userOffers.filter(offer => offer.status === 'active').length,
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      name: 'Active Requests',
      value: userRequests.filter(request => request.status === 'active').length,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
    {
      name: 'Credits This Week',
      value: creditsEarnedThisWeek,
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  ];

  const quickActions = [
    {
      title: 'Browse Tasks',
      description: 'Explore all available task types and their credit values',
      href: '/marketplace?tab=tasks',
      icon: Star,
      color: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Offer Help',
      description: 'Share your skills with the community',
      href: '/marketplace?tab=offer',
      icon: Plus,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Request Help',
      description: 'Find someone to help you with a task',
      href: '/marketplace?tab=request',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Credit spending options
  const creditUsageOptions = [
    {
      title: 'Request Help from Others',
      description: 'Get assistance with coding, design, writing, and more',
      icon: Users,
      credits: '2-8 credits',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      action: '/marketplace?tab=request'
    },
    {
      title: 'Book Live Sessions',
      description: '1:1 tutoring, mentorship, or mock interviews',
      icon: Video,
      credits: '3-6 credits',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      action: '/marketplace?tab=browse'
    },
    {
      title: 'Post Custom Tasks',
      description: 'Create your own unique request for specialized help',
      icon: Plus,
      credits: '1-10 credits',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      action: '/marketplace?tab=request'
    },
    {
      title: 'Join Premium Events',
      description: 'Access exclusive webinars and skill-building workshops',
      icon: Trophy,
      credits: '5-15 credits',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      action: '#'
    },
    {
      title: 'Access Skill Resources',
      description: 'Download guides, tutorials, and curated learning materials',
      icon: BookOpen,
      credits: '1-3 credits',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      action: '#'
    },
    {
      title: 'Get Verified Badge',
      description: 'Earn a "Verified Member" badge for your profile',
      icon: Shield,
      credits: '10 credits',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      action: '/profile'
    },
    {
      title: 'Promote Your Offers',
      description: 'Boost visibility of your services in the marketplace',
      icon: Megaphone,
      credits: '2-5 credits',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      action: '/marketplace?tab=offer'
    },
    {
      title: 'Unlock Special Features',
      description: 'Access premium tools and advanced platform features',
      icon: Sparkles,
      credits: '5-20 credits',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      action: '#'
    }
  ];

  // Get popular task types from recent transactions
  const popularTasks = userTransactions
    .slice(0, 5)
    .map(t => {
      const taskType = taskTypes.find(task => task.name === t.taskType);
      return {
        ...t,
        taskIcon: taskType?.icon || '⭐',
        taskCategory: taskType?.category || 'Other'
      };
    });

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to share your skills and earn credits today?
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl px-6 py-3 shadow-md">
              <Clock className="w-5 h-5" />
              <span className="font-semibold text-lg">{user.timeCredits} Credits Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.href}
              className="group bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
              <p className="text-gray-600 mt-1">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* What Can You Do with Your Time Credits Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Gift className="w-7 h-7 mr-3 text-purple-600" />
                What Can You Do with Your Time Credits?
              </h2>
              <p className="text-gray-600 mt-2">Discover all the amazing ways to spend your credits in our community</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-700">{user.timeCredits} Credits Available</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditUsageOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Link
                  key={index}
                  to={option.action}
                  className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`${option.bgColor} ${option.textColor} px-2 py-1 rounded-full text-xs font-bold`}>
                      {option.credits}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-purple-600 transition-colors">
                    {option.title}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className="mt-3 flex items-center text-xs text-gray-500 group-hover:text-purple-600 transition-colors">
                    <span>Learn more</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
          
          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-900">Ready to Spend Your Credits?</h3>
            </div>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Your {user.timeCredits} credits are waiting to unlock amazing opportunities. Start exploring what our community has to offer!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/marketplace?tab=browse"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Users className="w-5 h-5" />
                <span>Browse Community</span>
              </Link>
              <Link
                to="/marketplace?tab=request"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Request Help</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          {popularTasks.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No recent transactions</p>
              <p className="text-gray-400 text-sm mt-1">Start helping others to see your activity here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {popularTasks.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className="text-lg">{transaction.taskIcon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{transaction.taskType}</span>
                        <span>•</span>
                        <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} credits
                    </span>
                    <div className="text-xs text-gray-500">
                      {transaction.taskCategory}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Types Overview */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Popular Task Types</h2>
            <Link 
              to="/marketplace?tab=tasks"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {taskTypes.slice(0, 6).map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{task.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{task.category}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {task.credits}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;