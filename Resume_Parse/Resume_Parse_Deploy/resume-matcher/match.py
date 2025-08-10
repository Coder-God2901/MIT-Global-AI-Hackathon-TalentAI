# match.py
import numpy as np
from typing import List, Tuple
from sklearn.metrics.pairwise import cosine_similarity
import faiss
import math

def build_faiss_index(embeddings: np.ndarray):
    # embeddings: (n, d) float32
    n, d = embeddings.shape
    index = faiss.IndexFlatIP(d)   # inner product on normalized vectors = cosine similarity
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    return index

def search_faiss(index, query_emb: np.ndarray, top_k=10):
    # query_emb: (m, d)
    faiss.normalize_L2(query_emb)
    D, I = index.search(query_emb, top_k)
    # D are inner products (cosine since normalized)
    return I, D

def topk_by_cosine(all_embs: np.ndarray, query_emb: np.ndarray, top_k=10):
    # simple CPU fallback
    # normalize
    def _norm(a):
        a_norm = a / (np.linalg.norm(a, axis=1, keepdims=True) + 1e-9)
        return a_norm
    A = _norm(all_embs)
    Q = _norm(query_emb)
    sims = Q.dot(A.T)  # (m, n)
    idx = np.argsort(-sims, axis=1)[:, :top_k]
    scores = -np.sort(-sims, axis=1)[:, :top_k]
    return idx, scores
