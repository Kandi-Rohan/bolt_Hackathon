import React, { useState } from 'react';
import { Clock, CreditCard, Check, Star, Zap, Crown, Gift, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const BuyCredits: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Pack',
      price: 49,
      credits: 10,
      popular: false,
      icon: '💰',
      features: [
        '10 Time Credits',
        'Access to all basic tasks',
        'Community support',
        'Mobile app access'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'popular',
      name: 'Popular Choice',
      price: 99,
      credits: 25,
      popular: true,
      icon: '🕒',
      features: [
        '25 Time Credits',
        'Priority task matching',
        'Advanced filters',
        'Email notifications',
        '5% bonus credits'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      price: 199,
      credits: 60,
      popular: false,
      icon: '🎁',
      features: [
        '60 Time Credits',
        'VIP support',
        'Custom task categories',
        'Analytics dashboard',
        '20% bonus credits',
        'Verified badge included'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const handlePurchase = async (planId: string) => {
    if (!user) return;
    
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    setIsProcessing(true);
    setSelectedPlan(planId);
    
    try {
      // Simulate payment processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user credits immediately
      const newCredits = user.timeCredits + plan.credits;
      updateUser({ timeCredits: newCredits });
      
      showSuccess('✅ Purchase Successful!', `Successfully purchased ${plan.credits} credits! Your new balance: ${newCredits} credits`);
      
      // Navigate back to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      showError('Purchase Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Buy Time Credits</h1>
          <p className="text-blue-100 text-lg">
            Invest in your skills and unlock the full potential of our community
          </p>
        </div>
      </div>

      {/* Current Balance */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Current Balance</h2>
            <p className="text-gray-600">Your available credits</p>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full">
            <Clock className="w-6 h-6 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{user?.timeCredits || 0}</span>
            <span className="text-gray-600">credits</span>
          </div>
        </div>
      </div>

      {/* Enhanced Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
              plan.popular ? 'border-green-300 ring-2 ring-green-200' : plan.borderColor
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </div>
              </div>
            )}

            <div className="p-8">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{plan.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <div className="text-gray-600 mt-1">for {plan.credits} credits</div>
                  <div className="text-sm text-gray-500">₹{(plan.price / plan.credits).toFixed(1)} per credit</div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={isProcessing}
                className={`w-full bg-gradient-to-r ${plan.color} text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                  isProcessing && selectedPlan === plan.id ? 'animate-pulse' : ''
                }`}
              >
                {isProcessing && selectedPlan === plan.id ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Buy ${plan.credits} Credits`
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Why Buy Credits Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Buy Time Credits?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: '🎯', 
              title: 'Get Help Fast', 
              desc: 'Access skilled community members instantly',
              color: 'from-blue-500 to-blue-600'
            },
            { 
              icon: '💡', 
              title: 'Learn New Skills', 
              desc: 'Book 1:1 sessions with experts',
              color: 'from-green-500 to-green-600'
            },
            { 
              icon: '🚀', 
              title: 'Boost Your Projects', 
              desc: 'Get professional assistance for your work',
              color: 'from-purple-500 to-purple-600'
            },
            { 
              icon: '🤝', 
              title: 'Support Community', 
              desc: 'Help others while getting help yourself',
              color: 'from-orange-500 to-orange-600'
            }
          ].map((item, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center space-x-3 text-gray-700">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium">Secure Payment Processing</p>
            <p className="text-sm text-gray-600">Your payment information is encrypted and secure. Credits are added instantly to your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;