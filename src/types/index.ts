export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  skills: string[];
  city: string;
  timeCredits: number;
  totalTimeGiven: number;
  totalTimeReceived: number;
  joinDate: string;
  avatar?: string;
  badges: Badge[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  category: 'achievement' | 'milestone' | 'special';
}

export interface Review {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  taskId: string;
  taskTitle: string;
  rating: number;
  comment?: string;
  createdAt: string;
  type: 'helper' | 'requester';
}

export interface TaskType {
  id: string;
  name: string;
  credits: number;
  category: string;
  icon: string;
  description: string;
  estimatedTime: string;
  detailedDescription: string;
  requiredSkills: string[];
  typicalProviders: string[];
}

export interface Offer {
  id: string;
  userId: string;
  userName: string;
  userCity: string;
  taskType: string;
  customTask?: string;
  description: string;
  credits: number;
  mode: 'online' | 'offline' | 'both';
  location?: string;
  isRemote: boolean;
  createdAt: string;
  status: 'open' | 'in_progress' | 'completed' | 'expired';
  completedAt?: string;
  expiresAt?: string;
}

export interface Request {
  id: string;
  userId: string;
  userName: string;
  userCity: string;
  taskType: string;
  customTask?: string;
  description: string;
  credits: number;
  mode: 'online' | 'offline' | 'both';
  location?: string;
  isRemote: boolean;
  createdAt: string;
  status: 'open' | 'in_progress' | 'completed' | 'expired';
  completedAt?: string;
  expiresAt?: string;
}

export interface Transaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  taskType: string;
  description: string;
  createdAt: string;
  type: 'earned' | 'spent';
}

export interface Match {
  id: string;
  requestId: string;
  offerId: string;
  requesterId: string;
  helperId: string;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  duration?: number;
}