import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Badge } from '../types';
import { checkAndAwardBadges } from '../utils/badges';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, city: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  awardBadges: (totalTasksCompleted: number, totalCreditsEarned: number) => Badge[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('timebank_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Ensure user has required new fields
      const updatedUser = {
        ...parsedUser,
        badges: parsedUser.badges || [],
        reviews: parsedUser.reviews || [],
        rating: parsedUser.rating || 0,
        reviewCount: parsedUser.reviewCount || 0
      };
      setUser(updatedUser);
      localStorage.setItem('timebank_user', JSON.stringify(updatedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      // Ensure user has required new fields
      const updatedUser = {
        ...foundUser,
        badges: foundUser.badges || [],
        reviews: foundUser.reviews || [],
        rating: foundUser.rating || 0,
        reviewCount: foundUser.reviewCount || 0
      };
      setUser(updatedUser);
      localStorage.setItem('timebank_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string, city: string): Promise<boolean> => {
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      return false; // User already exists
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      bio: '',
      skills: [],
      city,
      timeCredits: 5, // Start with 5 credits
      totalTimeGiven: 0,
      totalTimeReceived: 0,
      joinDate: new Date().toISOString(),
      badges: [],
      reviews: [],
      rating: 0,
      reviewCount: 0
    };

    users.push(newUser);
    localStorage.setItem('timebank_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('timebank_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('timebank_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('timebank_user', JSON.stringify(updatedUser));

    // Update in users array
    const users = JSON.parse(localStorage.getItem('timebank_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('timebank_users', JSON.stringify(users));
    }
  };

  const awardBadges = (totalTasksCompleted: number, totalCreditsEarned: number): Badge[] => {
    if (!user) return [];
    
    const newBadges = checkAndAwardBadges(user, totalTasksCompleted, totalCreditsEarned);
    
    if (newBadges.length > 0) {
      const updatedUser = {
        ...user,
        badges: [...user.badges, ...newBadges]
      };
      updateUser(updatedUser);
    }
    
    return newBadges;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, awardBadges }}>
      {children}
    </AuthContext.Provider>
  );
};