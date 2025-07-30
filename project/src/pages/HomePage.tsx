import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Upload, 
  Brain, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Easy Upload",
      description: "Simply upload your heartbeat audio file in .wav format"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Advanced machine learning algorithms analyze your heartbeat patterns"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get real-time detection results within seconds"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health Insights",
      description: "Receive personalized lifestyle and health recommendations"
    }
  ];

  const benefits = [
    "Early detection of potential heart conditions",
    "Non-invasive and convenient screening",
    "Immediate personalized health recommendations",
    "Track your heart health over time",
    "Medical-grade accuracy with AI technology"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Real-Time{' '}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                  Heart Disease
                </span>{' '}
                Detection
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Advanced AI-powered analysis of heartbeat audio to detect potential heart conditions 
                and provide personalized health recommendations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/upload"
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <Upload className="w-5 h-5" />
                <span>Start Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 px-8 py-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system makes heart health screening simple and accessible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-lg flex items-center justify-center text-white mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose CardioAI?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Experience the future of heart health screening with our advanced AI technology
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8"
            >
              <div className="text-center">
                <Heart className="w-24 h-24 text-red-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Trusted by Healthcare Professionals
                </h3>
                <p className="text-gray-600 mb-6">
                  Our AI model has been trained on thousands of heartbeat samples and 
                  validated by medical experts for accurate detection
                </p>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">95%</div>
                    <div className="text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">10k+</div>
                    <div className="text-gray-600">Analyzed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Check Your Heart Health?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Upload your heartbeat audio and get instant AI-powered analysis with personalized recommendations
            </p>
            <Link
              to="/upload"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Start Your Analysis</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;