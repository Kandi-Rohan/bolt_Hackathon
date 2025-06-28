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
      name: 'Riya Kapoor',
      role: 'Final Year CSE Student, VIT Vellore',
      content: 'The custom task system lets me get exactly the help I need for my projects.',
      rating: 5,
      initials: 'RK',
    },
    {
      name: 'Rohit Patil',
      role: 'Web Developer, Pune',
      content: 'I earned credits building websites and used them for interview prep. Perfect exchange!',
      rating: 5,
      initials: 'RP',
    },
    {
      name: 'Ananya Roy',
      role: 'Freelance Designer, Kolkata',
      content: 'Love how I can set my own prices and work both online and offline.',
      rating: 5,
      initials: 'AR',
    },
    {
      name: 'Sneha Nair',
      role: 'NGO Volunteer, Kochi',
      content: 'The community is amazing - everyone helps each other grow.',
      rating: 5,
      initials: 'SN',
    },
    {
      name: 'Aditya Joshi',
      role: 'AI/ML Enthusiast, Mumbai',
      content: 'Got exactly the coding help I needed. The credit system is fair and transparent.',
      rating: 5,
      initials: 'AJ',
    },
  ];

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
      <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Exchange Skills.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empower Each Other.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mt-4 leading-relaxed">
              Earn Time Credits by helping your community. Spend them on what you need.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>{user ? 'Go to Dashboard' : 'Start Earning Credits'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">∞</div>
              <div className="text-gray-600">Custom Tasks Created</div>
            </div>
            <div className="text-center bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">2,000+</div>
              <div className="text-gray-600">Credits Exchanged</div>
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

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose TimeBank?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join a community where your skills are valued fairly and everyone benefits from knowledge sharing.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-blue-200 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Time Credit Wallet</h3>
                    <p className="text-gray-600">Your community currency</p>
                  </div>
                </div>
                
                <div className="text-center py-10 bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl border border-blue-100 shadow-inner mb-6">
                  <div className="relative">
                    <div className="text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 animate-pulse">
                      5
                    </div>
                    <div className="absolute -top-2 -right-8">
                      <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" />
                    </div>
                    <div className="absolute -bottom-2 -left-8">
                      <Gift className="w-5 h-5 text-green-500 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800 mb-2">Starting Credits</div>
                  <div className="text-sm text-gray-600 bg-white/70 px-4 py-2 rounded-full inline-block">
                    🎉 Free welcome bonus!
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-green-700 mb-1">Earn</div>
                    <div className="text-xs text-green-600">Help others & grow your wallet</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-purple-700 mb-1">Spend</div>
                    <div className="text-xs text-purple-600">Get help when you need it</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from TimeBank members across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
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