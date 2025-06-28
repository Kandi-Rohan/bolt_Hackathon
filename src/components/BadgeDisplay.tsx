import React from 'react';
import { Badge } from '../types';

interface BadgeDisplayProps {
  badges: Badge[];
  showAll?: boolean;
  maxDisplay?: number;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges, 
  showAll = false, 
  maxDisplay = 3 
}) => {
  const displayBadges = showAll ? badges : badges.slice(0, maxDisplay);
  const remainingCount = badges.length - maxDisplay;

  if (badges.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🏆</span>
        </div>
        <p className="text-gray-500 font-medium">No badges earned yet</p>
        <p className="text-gray-400 text-sm mt-1">Complete tasks to earn your first badge!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-gradient-to-r ${badge.color} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">{badge.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white truncate">{badge.name}</h4>
                <p className="text-white/80 text-sm">{badge.description}</p>
                <p className="text-white/60 text-xs mt-1">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && remainingCount > 0 && (
        <div className="text-center">
          <span className="text-gray-500 text-sm">
            +{remainingCount} more badge{remainingCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;