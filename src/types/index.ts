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
  isRemote: boolean;
  createdAt: string;
  status: 'active' | 'in_progress' | 'completed';
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
  isRemote: boolean;
  createdAt: string;
  status: 'active' | 'matched' | 'completed';
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
  status: 'pending' | 'accepted' | 'completed';
  createdAt: string;
}