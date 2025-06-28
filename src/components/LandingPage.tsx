import React from 'react';
import { Clock, Users, Award, ArrowRight, CheckCircle, Star, Zap, TrendingUp, Heart } from 'lucide-react';
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
      title: 'Task-Based Credits',
      description: 'Earn credits based on task complexity and skill level. Each task has its own credit value.',
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
      title: 'Skill Recognition',
      description: 'Build your reputation and earn badges as you help others in your community.',
      color: 'purple',
    },
  ];

  const benefits = [
    'Start with 5 free time credits',
    'Task-based credit system',
    'Build valuable community connections',
    'Learn new skills from experts',
    'Flexible remote and local options',
    'Gamified experience with rewards',
  ];

  const testimonials = [
    {
      name: 'Riya Kapoor',
      role: 'Final Year CSE Student, VIT Vellore',
      content: 'The task-based credit system makes learning feel more meaningful and fair.',
      rating: 5,
      initials: 'RK',
    },
    {
      name: 'Rohit Patil',
      role: 'Web Developer, Pune',
      content: 'I earned 8 credits building a website and used them for interview prep. Perfect exchange!',
      rating: 5,
      initials: 'RP',
    },
    {
      name: 'Ananya Roy',
      role: 'Freelance Designer, Kolkata',
      content: 'Offered logo design for 5 credits and got math tutoring in return. Love this system!',
      rating: 5,
      initials: 'AR',
    },
    {
      name: 'Sneha Nair',
      role: 'NGO Volunteer, Kochi',
      content: 'Helped with assignments and received language practice. Fair credit values for everyone.',
      rating: 5,
      initials: 'SN',
    },
    {
      name: 'Aditya Joshi',
      role: 'AI/ML Enthusiast, Mumbai',
      content: 'Got 4 credits for interview prep help and used them for coding assistance. Great platform!',
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
              <a href="#tasks" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Tasks
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
              <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
              <div className="text-gray-600">Task Types Available</div>
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
              A fair system where skills are valued based on complexity and time investment
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
                { step: '1', title: 'Sign Up & Get Credits', desc: 'Join with 5 free time credits', icon: Zap },
                { step: '2', title: 'Choose Your Tasks', desc: 'Browse 15+ task types with different credit values', icon: Users },
                { step: '3', title: 'Exchange & Earn', desc: 'Complete tasks and earn credits based on complexity', icon: TrendingUp },
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

      {/* Task Examples Section */}
      <section id="tasks" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Task Types
            </h2>
            <p className="text-xl text-gray-600">
              Each task has a fair credit value based on skill level and time required
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Resume Review', credits: 2, icon: '📄', category: 'Career' },
              { name: 'Basic HTML Help', credits: 3, icon: '💻', category: 'Programming' },
              { name: 'Logo Design', credits: 5, icon: '🎨', category: 'Design' },
              { name: 'Math Tutoring', credits: 4, icon: '📐', category: 'Education' },
              { name: 'Video Editing', credits: 6, icon: '🎬', category: 'Media' },
              { name: 'Build Website', credits: 8, icon: '🌐', category: 'Programming' },
            ].map((task, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{task.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{task.name}</h3>
                      <p className="text-sm text-gray-500">{task.category}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {task.credits} credits
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/tasks"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <span>View All Tasks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
            
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-8 border border-blue-100">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Time Credit Wallet</h3>
                  <p className="text-gray-600 text-sm">Your community currency</p>
                </div>
              </div>
              
              <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">5</div>
                <div className="text-gray-600 font-medium">Starting Credits</div>
                <div className="mt-4 text-sm text-gray-500">
                  Earn more by helping others!
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">Earn</div>
                  <div className="text-xs text-gray-500">Credits for helping</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">Spend</div>
                  <div className="text-xs text-gray-500">Credits for assistance</div>
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
            Start sharing your skills and earning credits today. It's free to join!
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
                Building stronger communities through skill sharing and task-based time exchange. 
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
                <li><Link to="/tasks" className="hover:text-white transition-colors">Task Types</Link></li>
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