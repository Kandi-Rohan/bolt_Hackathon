import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Offer, Request, Transaction, Match } from '../types';

interface DataContextType {
  offers: Offer[];
  requests: Request[];
  transactions: Transaction[];
  matches: Match[];
  addOffer: (offer: Omit<Offer, 'id' | 'createdAt'>) => void;
  addRequest: (request: Omit<Request, 'id' | 'createdAt'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  completeMatch: (matchId: string) => void;
  createMatch: (requestId: string, offerId: string, requesterId: string, helperId: string) => void;
  acceptMatch: (matchId: string) => void;
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

  useEffect(() => {
    const savedOffers = localStorage.getItem('timebank_offers');
    const savedRequests = localStorage.getItem('timebank_requests');
    const savedTransactions = localStorage.getItem('timebank_transactions');
    const savedMatches = localStorage.getItem('timebank_matches');

    if (savedOffers) setOffers(JSON.parse(savedOffers));
    if (savedRequests) setRequests(JSON.parse(savedRequests));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedMatches) setMatches(JSON.parse(savedMatches));
  }, []);

  const addOffer = (offerData: Omit<Offer, 'id' | 'createdAt'>) => {
    const newOffer: Offer = {
      ...offerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedOffers = [...offers, newOffer];
    setOffers(updatedOffers);
    localStorage.setItem('timebank_offers', JSON.stringify(updatedOffers));
  };

  const addRequest = (requestData: Omit<Request, 'id' | 'createdAt'>) => {
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
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
  };

  const completeMatch = (matchId: string) => {
    const updatedMatches = matches.map(match =>
      match.id === matchId ? { ...match, status: 'completed' as const } : match
    );
    setMatches(updatedMatches);
    localStorage.setItem('timebank_matches', JSON.stringify(updatedMatches));
  };

  return (
    <DataContext.Provider value={{
      offers,
      requests,
      transactions,
      matches,
      addOffer,
      addRequest,
      addTransaction,
      completeMatch,
      createMatch,
      acceptMatch,
    }}>
      {children}
    </DataContext.Provider>
  );
};