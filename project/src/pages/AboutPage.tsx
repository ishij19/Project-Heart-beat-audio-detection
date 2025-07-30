import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Users, 
  Award,
  Zap,
  Heart,
  Database,
  Cpu,
  Mic,
  BarChart3
} from 'lucide-react';

const AboutPage = () => {
  const technologies = [
    {
      icon: <Brain className="w-8 h-8" />,
      name: 'Machine Learning',
      description: 'Random Forest and deep learning models for accurate classification'
    },
    {
      icon: <Mic className="w-8 h-8" />,
      name: 'Audio Processing',
      description: 'Librosa for MFCC feature extraction and signal processing'
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: 'Data Science',
      description: 'Scikit-learn for model training and evaluation'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      name: 'Flask Backend',
      description: 'Python Flask API for real-time audio analysis'
    }
  ];

  const methodology = [
    {
      step: '01',
      title: 'Audio Preprocessing',
      description: 'Convert uploaded .wav files to standardized format and remove noise'
    },
    {
      step: '02',
      title: 'Feature Extraction',
      description: 'Extract MFCC (Mel-frequency cepstral coefficients) from audio signals'
    },
    {
      step: '03',
      title: 'ML Classification',
      description: 'Apply trained Random Forest model to classify heartbeat patterns'
    },
    {
      step: '04',
      title: 'Result Analysis',
      description: 'Generate confidence scores and personalized health recommendations'
    }
  ];

  const stats = [
    { number: '95%', label: 'Accuracy Rate', icon: <Award className="w-6 h-6" /> },
    { number: '10,000+', label: 'Audio Samples', icon: <Database className="w-6 h-6" /> },
    { number: '3 Classes', label: 'Detection Types', icon: <BarChart3 className="w-6 h-6" /> },
    { number: '< 5 sec', label: 'Analysis Time', icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About CardioAI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing heart health screening through advanced AI technology and machine learning, 
            making cardiac care more accessible and immediate for everyone.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-12 mb-16 text-center"
        >
          <Heart className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            To democratize heart health screening by providing instant, AI-powered analysis of heartbeat audio, 
            enabling early detection and personalized health recommendations for better cardiovascular outcomes.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tech.name}
                </h3>
                <p className="text-gray-600">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-2xl p-12 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detection Classes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Detection Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Normal</h3>
              <p className="text-gray-600">
                Healthy heartbeat patterns with regular rhythm and no abnormal sounds detected
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Murmur</h3>
              <p className="text-gray-600">
                Heart murmur detected - additional heart sounds that may indicate medical attention needed
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Noisy</h3>
              <p className="text-gray-600">
                Audio quality insufficient for analysis - requires re-recording in quieter environment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center"
        >
          <Shield className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Medical Disclaimer</h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            CardioAI is a screening tool designed to assist in health monitoring and should not replace 
            professional medical diagnosis or treatment. Always consult with qualified healthcare 
            professionals for medical advice and proper cardiac evaluation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;