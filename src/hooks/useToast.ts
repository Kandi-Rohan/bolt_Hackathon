import { useState, useCallback } from 'react';
import { Toast } from '../types';

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast: Toast = { ...toast, id, duration: toast.duration || 3000 };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message: string) => {
    addToast({ type: 'success', title, message, duration: 3000 });
  }, [addToast]);

  const showError = useCallback((title: string, message: string) => {
    addToast({ type: 'error', title, message, duration: 4000 });
  }, [addToast]);

  const showInfo = useCallback((title: string, message: string) => {
    addToast({ type: 'info', title, message, duration: 3000 });
  }, [addToast]);

  const showWarning = useCallback((title: string, message: string) => {
    addToast({ type: 'warning', title, message, duration: 3500 });
  }, [addToast]);

  return {
    toasts,
    removeToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};