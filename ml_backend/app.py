from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import joblib
import os
import tempfile

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
model = joblib.load('heartbeat_rf_model.joblib')

# Example lifestyle suggestions
SUGGESTIONS = {
    'normal': 'Maintain a healthy lifestyle with regular exercise and a balanced diet.',
    'murmur': 'Consult a cardiologist. Avoid strenuous activity until cleared by a doctor.',
    'noisy': 'Try recording in a quiet environment. If symptoms persist, seek medical advice.'
}

def extract_features(file_path, n_mfcc=20):
    y, sr = librosa.load(file_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfcc_mean = np.mean(mfcc, axis=1)
    return mfcc_mean.reshape(1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    file = request.files['file']
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    try:
        file.save(tmp.name)
        tmp.close()  # Ensure file is closed before reading
        try:
            features = extract_features(tmp.name)
            pred = model.predict(features)[0]
            confidence = max(model.predict_proba(features)[0])
            suggestion = SUGGESTIONS.get(pred, '')
            result = {
                'result': pred,
                'confidence': float(confidence),
                'suggestion': suggestion
            }
            return jsonify(result)
        except Exception as e:
            print(f"Error processing audio: {e}")
            return jsonify({'error': f'Failed to analyze audio: {str(e)}'}), 400
    finally:
        os.unlink(tmp.name)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
