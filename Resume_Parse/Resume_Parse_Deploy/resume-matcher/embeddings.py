# embeddings.py
from typing import List
import numpy as np
import json
import os

# Option A: Local via sentence-transformers (recommended)
from sentence_transformers import SentenceTransformer

MODEL_NAME = os.getenv("SENTENCE_TRANSFORMER_MODEL", "all-MiniLM-L6-v2")

class LocalEmbedder:
    def __init__(self, model_name=MODEL_NAME):
        self.model = SentenceTransformer(model_name)

    def embed_texts(self, texts: List[str], batch_size=32):
        # returns numpy array (n, d)
        embs = self.model.encode(texts, batch_size=batch_size, show_progress_bar=True, convert_to_numpy=True)
        return embs

# Option B: OpenAI embeddings (requires OPENAI_API_KEY, optional)
try:
    import openai
    OPENAI_AVAILABLE = True
except Exception:
    OPENAI_AVAILABLE = False

class OpenAIEmbedder:
    def __init__(self, model="text-embedding-3-small"):
        if not OPENAI_AVAILABLE:
            raise RuntimeError("openai package not installed")
        self.model = model

    def embed_texts(self, texts: List[str], batch_size=16):
        import time
        out = []
        for i in range(0, len(texts), batch_size):
            chunk = texts[i:i+batch_size]
            resp = openai.Embedding.create(input=chunk, model=self.model)
            for item in resp['data']:
                out.append(np.array(item['embedding'], dtype=np.float32))
        return np.vstack(out)

# helpers to serialize numpy arrays to JSON
def emb_to_json(emb: np.ndarray):
    return json.dumps(emb.tolist())

def json_to_emb(s: str):
    import numpy as np
    return np.array(json.loads(s), dtype=np.float32)
