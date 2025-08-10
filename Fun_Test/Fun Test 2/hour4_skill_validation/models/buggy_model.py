# models/buggy_model.py
"""
Buggy ML model for the candidate to fix.
The candidate's task: Fix the bug so that `build_model()` returns a fitted sklearn estimator that
can be used to predict on new data.

Bug introduced: Using `LogisticRegression` with default solver but not scaling features and
also accidentally returning the class instead of the model object.
"""

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import make_classification

def build_model():
    # generate toy data (in real test harness the harness will use synthetic data — candidate should just build proper pipeline)
    X, y = make_classification(n_samples=100, n_features=6, random_state=0)
    scaler = StandardScaler()
    lr = LogisticRegression(max_iter=200)
    pipeline = Pipeline([
        ('scaler', scaler),
        ('clf', lr)
    ])

    pipeline.fit(X, y)
    # BUG: returning predicted classes, not the model
    return pipeline.predict(X)
