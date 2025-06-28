import React, { useMemo } from 'react';
import { Trophy, Award, Star, Clock, TrendingUp, Crown, Medal, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Leaderboard: React.FC = () => {
  const { user } = useAuth();

  // Get all users from localStorage
  const allUsers = useMemo(() => {
    const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
    return users.sort((a: any, b: any) => b.totalTimeGiven - a.totalTimeGiven);
  }, []);

  const getBadgeInfo = (rank: number, timeGiven: number) => {
    if (rank === 1) {
      return {
        icon: Crown,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100',
        name: 'Community Champion',
        description: 'Top Helper'
      };
    } else if (rank === 2) {
      return {
        icon: Medal,
        color: 'text-gray-500',
        bgColor: 'bg-gray-100',
        name: 'Silver Helper',
        description: '2nd Place'
      };
    } else if (rank === 3) {
      return {
        icon: Award,
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        name: 'Bronze Helper',
        description: '3rd Place'
      };
    } else if (timeGiven >= 10) {
      return {
        icon: Star,
        color: 'text-purple-500',
        bgColor: 'bg-purple-100',
        name: 'Super Helper',
        description: '10+ Hours Given'
      };
    } else if (timeGiven >= 5) {
      return {
        icon: Zap,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
        name: 'Rising Star',
        description: '5+ Hours Given'
      };
    } else {
      return {
        icon: Trophy,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
        name: 'Helper',
        description: 'Active Member'
      };
    }
  };

  const userRank = allUsers.findIndex(u => u.id === user?.id) + 1;

  const stats = [
    {
      name: 'Total Community Hours',
      value: allUsers.reduce((sum, user) => sum + user.totalTimeGiven, 0),
      icon: Clock,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Active Members',
      value: allUsers.length,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Your Rank',
      value: userRank > 0 ? `#${userRank}` : 'N/A',
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Community Leaderboard</h1>
          <p className="text-blue-100 text-lg">
            Celebrating our most generous community members
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top 3 Podium */}
      {allUsers.length >= 3 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Top Contributors</h2>
          
          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-20 h-16 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div className="mt-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Medal className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">{allUsers[1]?.name || 'TBD'}</h3>
                <p className="text-sm text-gray-600">{allUsers[1]?.totalTimeGiven || 0} hours</p>
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div className="mt-4">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2 ring-4 ring-yellow-200">
                  <Crown className="w-10 h-10 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{allUsers[0]?.name || 'TBD'}</h3>
                <p className="text-sm text-gray-600">{allUsers[0]?.totalTimeGiven || 0} hours</p>
                <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                  Champion
                </span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-20 h-12 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="mt-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{allUsers[2]?.name || 'TBD'}</h3>
                <p className="text-sm text-gray-600">{allUsers[2]?.totalTimeGiven || 0} hours</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">All Members</h2>
          <p className="text-gray-600 text-sm mt-1">Ranked by total time contributed</p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {allUsers.length === 0 ? (
            <div className="p-8 text-center">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No members yet</p>
              <p className="text-gray-400 text-sm mt-1">Be the first to start helping others!</p>
            </div>
          ) : (
            allUsers.map((member, index) => {
              const rank = index + 1;
              const badge = getBadgeInfo(rank, member.totalTimeGiven);
              const BadgeIcon = badge.icon;
              const isCurrentUser = member.id === user?.id;

              return (
                <div
                  key={member.id}
                  className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {rank <= 3 ? (
                        <span className={`text-lg font-bold ${
                          rank === 1 ? 'text-yellow-500' : 
                          rank === 2 ? 'text-gray-500' : 'text-amber-600'
                        }`}>
                          #{rank}
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium">#{rank}</span>
                      )}
                    </div>

                    <div className={`w-12 h-12 ${badge.bgColor} rounded-full flex items-center justify-center`}>
                      <BadgeIcon className={`w-6 h-6 ${badge.color}`} />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {member.name}
                          {isCurrentUser && (
                            <span className="ml-2 text-blue-600 text-sm font-medium">(You)</span>
                          )}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {member.totalTimeGiven} hours given
                        </span>
                        <span className={`px-2 py-1 ${badge.bgColor} ${badge.color} text-xs font-medium rounded-full`}>
                          {badge.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {member.timeCredits}
                    </div>
                    <div className="text-sm text-gray-600">Credits</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Achievement Info */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Earn Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900">Champion</p>
              <p className="text-sm text-gray-600">Be #1 helper</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="w-8 h-8 text-purple-500" />
            <div>
              <p className="font-medium text-gray-900">Super Helper</p>
              <p className="text-sm text-gray-600">Give 10+ hours</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-medium text-gray-900">Rising Star</p>
              <p className="text-sm text-gray-600">Give 5+ hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;