import React from 'react';
import { Clock, Users, Award, ArrowRight, CheckCircle, Star, Zap, TrendingUp, Heart, Sparkles, Gift, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // If user is logged in, go to dashboard
      navigate('/dashboard');
    } else {
      // If user is not logged in, go to auth page
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: Clock,
      title: 'Credit-Based Exchange',
      description: 'Buy credits and use them to request help. Earn credits by offering your skills to others.',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with neighbors and build meaningful relationships through skill sharing.',
      color: 'green',
    },
    {
      icon: Award,
      title: 'Custom Tasks',
      description: 'Create any task you want - from coding help to design work, tutoring to consulting.',
      color: 'purple',
    },
  ];

  const benefits = [
    'Start with 5 free time credits',
    'Create custom tasks with your own pricing',
    'Choose online or offline collaboration',
    'Build valuable community connections',
    'Learn new skills from experts',
    'Flexible and fair credit system',
  ];

  const testimonials = [
    {
      name: 'Arjun Patel',
      role: 'Software Engineer, Bangalore',
      content: 'TimeBank helped me find excellent design help for my startup. The custom pricing system works perfectly.',
      rating: 5,
      initials: 'AP',
    },
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer, Mumbai',
      content: 'Great platform for offering my design services. I love how I can set my own credit rates.',
      rating: 4,
      initials: 'PS',
    },
    {
      name: 'Rohit Kumar',
      role: 'Student, Delhi',
      content: 'Found amazing tutors for coding help. The community is very supportive and responsive.',
      rating: 4,
      initials: 'RK',
    },
    {
      name: 'Sneha Reddy',
      role: 'Marketing Professional, Hyderabad',
      content: 'Good concept but sometimes takes time to find the right match for specific skills.',
      rating: 3,
      initials: 'SR',
    },
    {
      name: 'Vikash Singh',
      role: 'Entrepreneur, Pune',
      content: 'Excellent for getting quick business advice and consulting. The credit system is transparent.',
      rating: 5,
      initials: 'VS',
    },
    {
      name: 'Kavya Nair',
      role: 'Content Creator, Kochi',
      content: 'Helpful platform but wish there were more creative professionals in smaller cities.',
      rating: 4,
      initials: 'KN',
    },
  ];

  // Calculate average rating
  const averageRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonials.length;

  // Hero Illustration SVG Component
  const HeroIllustration = () => (
    <div className="relative">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-auto max-w-lg mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circles */}
        <circle cx="100" cy="80" r="60" fill="url(#gradient1)" opacity="0.1" />
        <circle cx="300" cy="200" r="80" fill="url(#gradient2)" opacity="0.1" />
        
        {/* People figures */}
        <g id="person1">
          <circle cx="120" cy="80" r="20" fill="url(#gradient1)" />
          <rect x="105" y="100" width="30" height="40" rx="15" fill="url(#gradient1)" />
          <circle cx="115" cy="75" r="8" fill="white" />
          <circle cx="125" cy="75" r="8" fill="white" />
        </g>
        
        <g id="person2">
          <circle cx="280" cy="180" r="20" fill="url(#gradient2)" />
          <rect x="265" y="200" width="30" height="40" rx="15" fill="url(#gradient2)" />
          <circle cx="275" cy="175" r="8" fill="white" />
          <circle cx="285" cy="175" r="8" fill="white" />
        </g>
        
        {/* Connection lines with animated dots */}
        <path
          d="M140 90 Q200 120 260 170"
          stroke="url(#gradient3)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="0;10"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Floating icons */}
        <g id="skills">
          <circle cx="200" cy="60" r="15" fill="url(#gradient4)" opacity="0.9" />
          <text x="200" y="67" textAnchor="middle" fontSize="16">💻</text>
          
          <circle cx="160" cy="140" r="15" fill="url(#gradient4)" opacity="0.9" />
          <text x="160" y="147" textAnchor="middle" fontSize="16">🎨</text>
          
          <circle cx="240" cy="120" r="15" fill="url(#gradient4)" opacity="0.9" />
          <text x="240" y="127" textAnchor="middle" fontSize="16">📚</text>
        </g>
        
        {/* Time/Clock element */}
        <g id="clock">
          <circle cx="200" cy="200" r="25" fill="url(#gradient5)" />
          <circle cx="200" cy="200" r="20" fill="white" />
          <line x1="200" y1="200" x2="200" y2="185" stroke="url(#gradient5)" strokeWidth="2" />
          <line x1="200" y1="200" x2="210" y2="200" stroke="url(#gradient5)" strokeWidth="2" />
          <circle cx="200" cy="200" r="3" fill="url(#gradient5)" />
        </g>
        
        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TimeBank
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Community
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Join Community
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-green-200/20 to-blue-200/20 rounded-full translate-x-40 translate-y-40 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 mb-8">
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{averageRating.toFixed(1)}/5</span>
                  <span className="text-sm text-gray-600">({testimonials.length} reviews)</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-gray-700">500+ Active Members</span>
                </div>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                Your Skills Have{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    Real Value
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 rounded-full opacity-30"></div>
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Create custom tasks, set your own prices, and connect with a community that values your expertise.
              </p>

              {/* Value proposition */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-full">
                  <Gift className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-semibold">5 Free Credits to Start</span>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-blue-200 px-4 py-2 rounded-full">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-semibold">Set Your Own Prices</span>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 rounded-full">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800 font-semibold">Community Driven</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[280px] justify-center"
                >
                  <span>{user ? 'Go to Dashboard' : 'Start Earning Credits'}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group bg-white/90 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl border border-gray-200 min-w-[280px] justify-center">
                  <span>Watch How It Works</span>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <HeroIllustration />
                {/* Floating elements around illustration */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg animate-ping">
                  <span className="text-white text-lg">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Stats - Enhanced Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black text-blue-600 mb-2">500+</div>
              <div className="text-gray-700 font-semibold">Active Community Members</div>
              <div className="text-sm text-gray-500 mt-2">Growing every day</div>
            </div>
            
            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black text-green-600 mb-2">∞</div>
              <div className="text-gray-700 font-semibold">Custom Tasks Created</div>
              <div className="text-sm text-gray-500 mt-2">Unlimited possibilities</div>
            </div>
            
            <div className="group bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-4xl font-black text-purple-600 mb-2">2,000+</div>
              <div className="text-gray-700 font-semibold">Credits Exchanged</div>
              <div className="text-sm text-gray-500 mt-2">Value created together</div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Trusted by professionals from</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <div className="text-gray-500 font-semibold">Google</div>
              <div className="text-gray-500 font-semibold">Microsoft</div>
              <div className="text-gray-500 font-semibold">Amazon</div>
              <div className="text-gray-500 font-semibold">Flipkart</div>
              <div className="text-gray-500 font-semibold">Zomato</div>
              <div className="text-gray-500 font-semibold">Paytm</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How TimeBank Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A flexible platform where you create your own tasks and set your own prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                    feature.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                    feature.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200' : 'bg-gradient-to-br from-purple-100 to-purple-200'
                  } group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-8 h-8 ${
                      feature.color === 'blue' ? 'text-blue-600' :
                      feature.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Process Steps */}
          <div className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Started in 3 Simple Steps</h3>
              <p className="text-gray-600">Join and start earning credits in minutes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Sign Up & Buy Credits', desc: 'Join with 5 free credits, then buy more as needed', icon: Zap },
                { step: '2', title: 'Create Custom Tasks', desc: 'Post what you can do or what you need help with', icon: Users },
                { step: '3', title: 'Exchange & Collaborate', desc: 'Connect with community members online or offline', icon: TrendingUp },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 shadow-md">
                        {item.step}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Can You Do on TimeBank?
            </h2>
            <p className="text-xl text-gray-600">
              Create any task you can imagine - the possibilities are endless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'Programming & Tech',
                examples: ['Website Development', 'Bug Fixes', 'Code Reviews', 'App Development'],
                icon: '💻',
                color: 'from-blue-500 to-blue-600'
              },
              {
                category: 'Design & Creative',
                examples: ['Logo Design', 'UI/UX Design', 'Video Editing', 'Content Creation'],
                icon: '🎨',
                color: 'from-purple-500 to-purple-600'
              },
              {
                category: 'Education & Tutoring',
                examples: ['Math Tutoring', 'Language Practice', 'Exam Prep', 'Skill Training'],
                icon: '📚',
                color: 'from-green-500 to-green-600'
              },
              {
                category: 'Business & Career',
                examples: ['Resume Reviews', 'Interview Prep', 'Business Consulting', 'Marketing Help'],
                icon: '💼',
                color: 'from-orange-500 to-orange-600'
              },
              {
                category: 'Writing & Content',
                examples: ['Article Writing', 'Proofreading', 'Translation', 'Copywriting'],
                icon: '✍️',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                category: 'Personal & Lifestyle',
                examples: ['Fitness Coaching', 'Cooking Lessons', 'Music Lessons', 'Life Coaching'],
                icon: '🌟',
                color: 'from-pink-500 to-pink-600'
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.examples.map((example, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-xs text-gray-500 italic">
                  ...and many more custom tasks!
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Task, Your Price, Your Way</h3>
              <p className="text-gray-600 mb-6">
                Unlike other platforms, TimeBank gives you complete freedom to create any task you want and set your own credit value. 
                Whether you need help with something specific or want to offer your unique skills, you're in control.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-900">Custom Tasks</h4>
                  <p className="text-sm text-gray-600">Create exactly what you need</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-semibold text-gray-900">Your Pricing</h4>
                  <p className="text-sm text-gray-600">Set credits based on complexity</p>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🌐</div>
                  <h4 className="font-semibold text-gray-900">Online/Offline</h4>
                  <p className="text-sm text-gray-600">Choose how you want to work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-x-36 -translate-y-36 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-200/30 to-blue-200/30 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium text-sm">Community First</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TimeBank?
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join a thriving community where your skills are valued fairly and everyone benefits from collaborative knowledge sharing.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Join Our Community</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Enhanced wallet card with better visual design */}
              <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-blue-200 overflow-hidden transform hover:scale-105 transition-all duration-300">
                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-8 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-ping"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Time Credit Wallet</h3>
                      <p className="text-gray-600">Your community currency</p>
                    </div>
                  </div>
                  
                  {/* Credit display with enhanced animation */}
                  <div className="text-center py-12 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 shadow-inner mb-8 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 opacity-30"></div>
                    
                    <div className="relative z-10">
                      <div className="relative inline-block">
                        <div className="text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
                          5
                        </div>
                        {/* Floating sparkles */}
                        <div className="absolute -top-4 -right-12">
                          <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
                        </div>
                        <div className="absolute -bottom-4 -left-12">
                          <Gift className="w-6 h-6 text-green-500 animate-pulse" />
                        </div>
                        <div className="absolute top-1/2 -right-16">
                          <Star className="w-5 h-5 text-purple-500 animate-spin" />
                        </div>
                      </div>
                      
                      <div className="text-xl font-bold text-gray-800 mb-3">Starting Credits</div>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full shadow-md">
                        <span className="text-2xl">🎉</span>
                        <span className="text-sm font-semibold text-gray-700">Free welcome bonus!</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Earn/Spend sections with enhanced design */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                      <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-green-700 mb-2">Earn</div>
                      <div className="text-sm text-green-600 font-medium">Help others & grow your wallet</div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Star className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-purple-700 mb-2">Spend</div>
                      <div className="text-sm text-purple-600 font-medium">Get help when you need it</div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="text-center">
                    <button
                      onClick={handleGetStarted}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto group"
                    >
                      <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Start Your Journey</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Additional floating elements around the card */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-float-delayed"></div>
            </div>
          </div>
        </div>
        
        {/* Custom animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-180deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 8s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}/5</span>
              <span className="text-gray-600">Average Rating</span>
            </div>
            <p className="text-xl text-gray-600">
              Real feedback from TimeBank members across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join the TimeBank Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start creating custom tasks and connecting with skilled community members today!
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>{user ? 'Go to Dashboard' : 'Get Started Now'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TimeBank</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Building stronger communities through skill sharing and custom task exchange. 
                Where everyone's expertise is valued fairly.
              </p>
              <div className="text-gray-500 text-sm">
                © 2025 TimeBank. Built for community, powered by skills.
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Create Tasks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Community Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Social Media</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;