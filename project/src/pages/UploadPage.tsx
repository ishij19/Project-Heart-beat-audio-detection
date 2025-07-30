import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileAudio, 
  AlertCircle, 
  CheckCircle, 
  Loader,
  X,
  Play,
  Pause
} from 'lucide-react';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    setError('');
    
    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith('.wav')) {
      setError('Please upload a .wav audio file');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    
    // Create audio element for preview
    const audioUrl = URL.createObjectURL(selectedFile);
    const audioElement = new Audio(audioUrl);
    setAudio(audioElement);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    setIsPlaying(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      URL.revokeObjectURL(audio.src);
      setAudio(null);
    }
  };

  const togglePlayback = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const simulateUploadAndAnalysis = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Real backend call
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      sessionStorage.setItem('analysisResult', JSON.stringify({
        filename: file.name,
        result: data.result,
        confidence: data.confidence,
        suggestion: data.suggestion,
        timestamp: new Date().toISOString()
      }));
      navigate('/result');
    } catch (err) {
      setError('Failed to analyze heartbeat. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Heartbeat Audio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a .wav file of your heartbeat recording for AI-powered analysis
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              file 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your heartbeat audio file here
                </h3>
                <p className="text-gray-600 mb-6">
                  or click to browse and select a .wav file
                </p>
                <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer inline-block">
                  Browse Files
                  <input
                    type="file"
                    accept=".wav"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supported format: .wav (max 10MB)
                </p>
              </>
            ) : (
              <div className="space-y-4">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-900">
                  File Ready for Analysis
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileAudio className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={togglePlayback}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Play className="w-5 h-5 text-blue-600" />
                        )}
                      </button>
                      <button
                        onClick={removeFile}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </motion.div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">
                  Analyzing heartbeat...
                </span>
                <span className="text-sm text-gray-600">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 flex items-center">
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Processing audio features and running ML analysis...
              </p>
            </motion.div>
          )}

          {/* Analyze Button */}
          {file && !isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <button
                onClick={simulateUploadAndAnalysis}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Analyze Heartbeat
              </button>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-blue-50 rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recording Instructions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">For Best Results:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Use a quiet environment</li>
                <li>• Record for 10-30 seconds</li>
                <li>• Keep device steady on chest</li>
                <li>• Avoid background noise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">File Requirements:</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Format: .wav only</li>
                <li>• Size: Maximum 10MB</li>
                <li>• Quality: 16-bit recommended</li>
                <li>• Sample rate: 8kHz or higher</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;