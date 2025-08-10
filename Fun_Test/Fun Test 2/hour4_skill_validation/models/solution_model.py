# models/solution_model.py
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.datasets import make_classification

def build_model():
    X, y = make_classification(n_samples=200, n_features=6, n_informative=4, random_state=42)
    pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('clf', LogisticRegression(max_iter=500, solver='lbfgs'))
    ])
    pipeline.fit(X, y)
    return pipeline
