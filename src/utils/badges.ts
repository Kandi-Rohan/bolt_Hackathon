import { Badge, User } from '../types';

export const AVAILABLE_BADGES: Omit<Badge, 'id' | 'earnedAt'>[] = [
  {
    name: 'Newbie',
    description: 'Completed your first task',
    icon: '🌱',
    color: 'from-green-400 to-green-500',
    category: 'achievement'
  },
  {
    name: 'Helper Hero',
    description: 'Helped 5 community members',
    icon: '🦸',
    color: 'from-blue-400 to-blue-500',
    category: 'achievement'
  },
  {
    name: 'TimeMaster',
    description: 'Earned 50+ credits',
    icon: '⏰',
    color: 'from-purple-400 to-purple-500',
    category: 'milestone'
  },
  {
    name: 'Community Star',
    description: 'Received 10+ five-star reviews',
    icon: '⭐',
    color: 'from-yellow-400 to-yellow-500',
    category: 'achievement'
  },
  {
    name: 'Skill Master',
    description: 'Added 10+ skills to profile',
    icon: '🎯',
    color: 'from-indigo-400 to-indigo-500',
    category: 'milestone'
  },
  {
    name: 'Early Adopter',
    description: 'One of the first 100 members',
    icon: '🚀',
    color: 'from-pink-400 to-pink-500',
    category: 'special'
  },
  {
    name: 'Mentor',
    description: 'Completed 20+ tutoring sessions',
    icon: '👨‍🏫',
    color: 'from-emerald-400 to-emerald-500',
    category: 'achievement'
  },
  {
    name: 'Credit Collector',
    description: 'Earned 100+ credits total',
    icon: '💰',
    color: 'from-amber-400 to-amber-500',
    category: 'milestone'
  }
];

export const checkAndAwardBadges = (user: User, totalTasksCompleted: number, totalCreditsEarned: number): Badge[] => {
  const newBadges: Badge[] = [];
  const existingBadgeNames = user.badges.map(b => b.name);

  // Check each badge condition
  AVAILABLE_BADGES.forEach(badgeTemplate => {
    if (existingBadgeNames.includes(badgeTemplate.name)) return;

    let shouldAward = false;

    switch (badgeTemplate.name) {
      case 'Newbie':
        shouldAward = totalTasksCompleted >= 1;
        break;
      case 'Helper Hero':
        shouldAward = totalTasksCompleted >= 5;
        break;
      case 'TimeMaster':
        shouldAward = totalCreditsEarned >= 50;
        break;
      case 'Community Star':
        shouldAward = user.reviewCount >= 10 && user.rating >= 4.5;
        break;
      case 'Skill Master':
        shouldAward = user.skills.length >= 10;
        break;
      case 'Early Adopter':
        // Check if user is among first 100 (simplified check)
        shouldAward = parseInt(user.id) <= 100;
        break;
      case 'Mentor':
        shouldAward = totalTasksCompleted >= 20;
        break;
      case 'Credit Collector':
        shouldAward = totalCreditsEarned >= 100;
        break;
    }

    if (shouldAward) {
      newBadges.push({
        ...badgeTemplate,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        earnedAt: new Date().toISOString()
      });
    }
  });

  return newBadges;
};