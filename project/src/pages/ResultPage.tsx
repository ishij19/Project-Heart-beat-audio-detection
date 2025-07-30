import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  User,
  Activity,
  Calendar,
  ArrowRight,
  Phone,
  Utensils,
  Dumbbell,
  Clock
} from 'lucide-react';

interface AnalysisResult {
  filename: string;
  result: 'normal' | 'murmur' | 'noisy';
  confidence: string;
  timestamp: string;
  suggestion?: string;
}

const ResultPage = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const savedResult = sessionStorage.getItem('analysisResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Analysis Found</h2>
          <p className="text-gray-600 mb-8">Please upload an audio file first</p>
          <Link
            to="/upload"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Audio
          </Link>
        </div>
      </div>
    );
  }

  const getResultConfig = (result: string) => {
    switch (result) {
      case 'normal':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
          title: 'Normal Heartbeat Detected',
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          description: 'Your heartbeat analysis shows normal patterns. Keep maintaining your heart health!'
        };
      case 'murmur':
        return {
          icon: <AlertTriangle className="w-16 h-16 text-orange-500" />,
          title: 'Heart Murmur Detected',
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          description: 'A heart murmur has been detected. Please consult with a healthcare professional for proper evaluation.'
        };
      case 'noisy':
        return {
          icon: <RefreshCw className="w-16 h-16 text-blue-500" />,
          title: 'Audio Quality Issue',
          color: 'blue',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          description: 'The audio quality is not clear enough for accurate analysis. Please try recording again in a quieter environment.'
        };
      default:
        return {
          icon: <Heart className="w-16 h-16 text-gray-500" />,
          title: 'Analysis Complete',
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          description: 'Analysis completed.'
        };
    }
  };

  const getRecommendations = (result: string) => {
    switch (result) {
      case 'normal':
        return [
          {
            icon: <Utensils className="w-6 h-6" />,
            title: 'Maintain Healthy Diet',
            description: 'Continue eating heart-healthy foods rich in omega-3, fiber, and antioxidants',
            action: 'Learn about heart-healthy recipes'
          },
          {
            icon: <Dumbbell className="w-6 h-6" />,
            title: 'Regular Exercise',
            description: 'Keep up with 150 minutes of moderate aerobic activity per week',
            action: 'Get a personalized workout plan'
          },
          {
            icon: <Calendar className="w-6 h-6" />,
            title: 'Regular Check-ups',
            description: 'Schedule annual heart health screenings with your doctor',
            action: 'Find healthcare providers'
          }
        ];
      case 'murmur':
        return [
          {
            icon: <Phone className="w-6 h-6" />,
            title: 'Consult a Doctor',
            description: 'Schedule an appointment with a cardiologist for professional evaluation',
            action: 'Find cardiologists near you',
            priority: true
          },
          {
            icon: <Activity className="w-6 h-6" />,
            title: 'Monitor Symptoms',
            description: 'Keep track of any chest pain, shortness of breath, or fatigue',
            action: 'Download symptom tracker'
          },
          {
            icon: <Utensils className="w-6 h-6" />,
            title: 'Heart-Healthy Lifestyle',
            description: 'Adopt a low-sodium diet and avoid excessive caffeine',
            action: 'Get dietary recommendations'
          }
        ];
      case 'noisy':
        return [
          {
            icon: <RefreshCw className="w-6 h-6" />,
            title: 'Re-record Audio',
            description: 'Try recording in a quieter environment with better microphone placement',
            action: 'Upload new recording',
            priority: true
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: 'Optimal Recording Time',
            description: 'Record for 10-30 seconds when you are calm and relaxed',
            action: 'View recording tips'
          }
        ];
      default:
        return [];
    }
  };

  const config = getResultConfig(result.result);
  const recommendations = getRecommendations(result.result);

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Analysis Results
          </h1>
          <p className="text-xl text-gray-600">
            Your heartbeat audio has been analyzed using advanced AI technology
          </p>

          {/* Backend Lifestyle Suggestion */}
          {result.suggestion && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded">
              <strong>AI Lifestyle Suggestion:</strong> {result.suggestion}
            </div>
          )}
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 mb-8 text-center`}
        >
          <div className="mb-6">
            {config.icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <p className={`text-lg ${config.textColor} mb-6`}>
            {config.description}
          </p>
          
          {/* Analysis Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <User className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">File</div>
              <div className="font-semibold text-gray-900">{result.filename}</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Confidence</div>
              <div className="font-semibold text-gray-900">{(parseFloat(result.confidence) * 100).toFixed(0)}%</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Analyzed</div>
              <div className="font-semibold text-gray-900">
                {new Date(result.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Personalized Recommendations
          </h3>
          
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  rec.priority 
                    ? 'border-red-200 bg-red-50 hover:border-red-300' 
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    rec.priority ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {rec.title}
                      {rec.priority && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          Priority
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-600 mb-4">{rec.description}</p>
                    <button className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      rec.priority
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      <span>{rec.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/upload"
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
          >
            Analyze Another Recording
          </Link>
          <button className="bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg border border-gray-300 hover:bg-gray-50 transition-colors">
            Download Report
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;