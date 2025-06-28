import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Offer, Request, Transaction, Match, Review } from '../types';

interface DataContextType {
  offers: Offer[];
  requests: Request[];
  transactions: Transaction[];
  matches: Match[];
  reviews: Review[];
  addOffer: (offer: Omit<Offer, 'id' | 'createdAt' | 'expiresAt'>) => void;
  addRequest: (request: Omit<Request, 'id' | 'createdAt' | 'expiresAt'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  completeMatch: (matchId: string) => void;
  createMatch: (requestId: string, offerId: string, requesterId: string, helperId: string) => void;
  acceptMatch: (matchId: string) => void;
  updateTaskStatus: (taskId: string, type: 'offer' | 'request', status: Offer['status']) => void;
  markTaskCompleted: (taskId: string, type: 'offer' | 'request') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedOffers = localStorage.getItem('timebank_offers');
    const savedRequests = localStorage.getItem('timebank_requests');
    const savedTransactions = localStorage.getItem('timebank_transactions');
    const savedMatches = localStorage.getItem('timebank_matches');
    const savedReviews = localStorage.getItem('timebank_reviews');

    if (savedOffers) {
      const parsedOffers = JSON.parse(savedOffers);
      // Update offers with new status field if missing
      const updatedOffers = parsedOffers.map((offer: any) => ({
        ...offer,
        status: offer.status || 'open',
        expiresAt: offer.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setOffers(updatedOffers);
    }
    
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // Update requests with new status field if missing
      const updatedRequests = parsedRequests.map((request: any) => ({
        ...request,
        status: request.status || 'open',
        expiresAt: request.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setRequests(updatedRequests);
    }
    
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
    if (savedReviews) setReviews(JSON.parse(savedReviews));

    // Check for expired tasks
    checkExpiredTasks();
  }, []);

  const checkExpiredTasks = () => {
    const now = new Date();
    
    setOffers(prev => {
      const updated = prev.map(offer => {
        if (offer.status === 'open' && offer.expiresAt && new Date(offer.expiresAt) < now) {
          return { ...offer, status: 'expired' as const };
        }
        return offer;
      });
      localStorage.setItem('timebank_offers', JSON.stringify(updated));
      return updated;
    });

    setRequests(prev => {
      const updated = prev.map(request => {
        if (request.status === 'open' && request.expiresAt && new Date(request.expiresAt) < now) {
          return { ...request, status: 'expired' as const };
        }
        return request;
      });
      localStorage.setItem('timebank_requests', JSON.stringify(updated));
      return updated;
    });
  };

  const addOffer = (offerData: Omit<Offer, 'id' | 'createdAt' | 'expiresAt'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: 'open'
    };
    
    const updatedOffers = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem('timebank_offers', JSON.stringify(updatedOffers));
  };

  const addRequest = (requestData: Omit<Request, 'id' | 'createdAt' | 'expiresAt'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      status: 'open'
    };
    
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('timebank_requests', JSON.stringify(updatedRequests));
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('timebank_transactions', JSON.stringify(updatedTransactions));
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem('timebank_reviews', JSON.stringify(updatedReviews));
  };

  const createMatch = (requestId: string, offerId: string, requesterId: string, helperId: string) => {
    const newMatch: Match = {
      id: Date.now().toString(),
      requestId,
      offerId,
      requesterId,
      helperId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    const updatedMatches = [...matches, newMatch];
    setMatches(updatedMatches);
    localStorage.setItem('timebank_matches', JSON.stringify(updatedMatches));
  };

  const acceptMatch = (matchId: string) => {
    const updatedMatches = matches.map(match =>
      match.id === matchId ? { ...match, status: 'accepted' as const } : match
    );
    setMatches(updatedMatches);
    localStorage.setItem('timebank_matches', JSON.stringify(updatedMatches));

    // Update related task status to in_progress
    const match = matches.find(m => m.id === matchId);
    if (match) {
      if (match.requestId) {
        updateTaskStatus(match.requestId, 'request', 'in_progress');
      }
      if (match.offerId) {
        updateTaskStatus(match.offerId, 'offer', 'in_progress');
      }
    }
  };

  const completeMatch = (matchId: string) => {
    const updatedMatches = matches.map(match =>
      match.id === matchId ? { 
        ...match, 
        status: 'completed' as const,
        completedAt: new Date().toISOString()
      } : match
    );
    setMatches(updatedMatches);
    localStorage.setItem('timebank_matches', JSON.stringify(updatedMatches));

    // Update related task status to completed
    const match = matches.find(m => m.id === matchId);
    if (match) {
      if (match.requestId) {
        markTaskCompleted(match.requestId, 'request');
      }
      if (match.offerId) {
        markTaskCompleted(match.offerId, 'offer');
      }
    }
  };

  const updateTaskStatus = (taskId: string, type: 'offer' | 'request', status: Offer['status']) => {
    if (type === 'offer') {
      const updatedOffers = offers.map(offer =>
        offer.id === taskId ? { ...offer, status } : offer
      );
      setOffers(updatedOffers);
      localStorage.setItem('timebank_offers', JSON.stringify(updatedOffers));
    } else {
      const updatedRequests = requests.map(request =>
        request.id === taskId ? { ...request, status } : request
      );
      setRequests(updatedRequests);
      localStorage.setItem('timebank_requests', JSON.stringify(updatedRequests));
    }
  };

  const markTaskCompleted = (taskId: string, type: 'offer' | 'request') => {
    const completedAt = new Date().toISOString();
    
    if (type === 'offer') {
      const updatedOffers = offers.map(offer =>
        offer.id === taskId ? { ...offer, status: 'completed' as const, completedAt } : offer
      );
      setOffers(updatedOffers);
      localStorage.setItem('timebank_offers', JSON.stringify(updatedOffers));
    } else {
      const updatedRequests = requests.map(request =>
        request.id === taskId ? { ...request, status: 'completed' as const, completedAt } : request
      );
      setRequests(updatedRequests);
      localStorage.setItem('timebank_requests', JSON.stringify(updatedRequests));
    }
  };

  return (
    <DataContext.Provider value={{
      offers,
      requests,
      transactions,
      matches,
      reviews,
      addOffer,
      addRequest,
      addTransaction,
      addReview,
      completeMatch,
      createMatch,
      acceptMatch,
      updateTaskStatus,
      markTaskCompleted,
    }}>
      {children}
    </DataContext.Provider>
  );
};