import os
import glob
import numpy as np
import pandas as pd
import librosa
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def extract_features(file_path, n_mfcc=20):
    y, sr = librosa.load(file_path, sr=None)
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
    mfcc_mean = np.mean(mfcc, axis=1)
    return mfcc_mean

def load_data(audio_dir, label_csv):
    df = pd.read_csv(label_csv)
    X, y = [], []
    for _, row in df.iterrows():
        file_path = os.path.join(audio_dir, row['fname'].replace('/', os.sep))
        if os.path.exists(file_path):
            try:
                features = extract_features(file_path)
                if features.shape[0] == 20:  # Ensure correct feature length
                    X.append(features)
                    y.append(row['label'])
            except Exception as e:
                print(f"Skipping {file_path}: {e}")
    return np.array(X), np.array(y)

def main():
    # Update these paths as needed
    # Paths for set_a and set_b
    base_dir = '../project/datasets/dataset'
    X_a, y_a = load_data(base_dir, os.path.join(base_dir, 'set_a.csv'))
    X_b, y_b = load_data(base_dir, os.path.join(base_dir, 'set_b.csv'))
    print(f"X_a shape: {X_a.shape}, y_a len: {len(y_a)}")
    print(f"X_b shape: {X_b.shape}, y_b len: {len(y_b)}")
    # Only use non-empty arrays with correct shape
    arrays_X = [arr for arr in [X_a, X_b] if arr is not None and len(arr) > 0 and arr.ndim == 2]
    arrays_y = [arr for arr in [y_a, y_b] if arr is not None and len(arr) > 0]
    if not arrays_X or not arrays_y:
        print("No valid data found for training.")
        return
    X = np.concatenate(arrays_X, axis=0)
    y = np.concatenate(arrays_y, axis=0)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    y_pred = clf.predict(X_test)
    print(classification_report(y_test, y_pred))
    joblib.dump(clf, 'heartbeat_rf_model.joblib')

if __name__ == '__main__':
    main()
