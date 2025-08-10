import json
from pathlib import Path
from db import get_engine, get_session, init_db, Candidate, Job
from parser import parse_resume, load_skillset
from embeddings import LocalEmbedder, emb_to_json, json_to_emb
from match import build_faiss_index, search_faiss, topk_by_cosine
import numpy as np
from sqlalchemy.exc import IntegrityError
import typer
from tqdm import tqdm

app = typer.Typer()

engine = get_engine()
init_db(engine)
session = get_session(engine)

embedder = LocalEmbedder()  # uses sentence-transformers


@app.command()
def ingest_job_file(file: str = "sample_jobs.json"):
    """Load jobs from JSON and embed and store them."""
    data = json.loads(Path(file).read_text())
    texts = []
    for j in data:
        texts.append(f"{j.get('title', '')}. Requirements: {j.get('requirements', '')}")
    embs = embedder.embed_texts(texts)
    for j, emb in zip(data, embs):
        job = Job(
            title=j['title'],
            location=j.get('location'),
            requirements=j.get('requirements'),
            embedding=emb_to_json(emb)
        )
        session.add(job)
    session.commit()
    typer.echo(f"Ingested {len(data)} jobs.")


@app.command()
def ingest_resume(pdf_path: str):
    """Parse PDF resume, embed, and store candidate."""
    parsed = parse_resume(pdf_path)

    # embed candidate skills and summary -> combine into a single text
    text_for_emb = "Skills: " + ", ".join(parsed["skills"]) + "\n" + parsed["experience_text"][:2000]
    emb = embedder.embed_texts([text_for_emb])[0]

    cand = Candidate(
        name=parsed['name'],
        email=parsed.get('email'),
        location=parsed.get('location'),
        skills=json.dumps(parsed['skills']),
        experience_text=parsed['experience_text'],
        embedding=emb_to_json(emb)
    )

    session.add(cand)
    session.commit()
    typer.echo(f"Stored candidate {cand.name} with id {cand.id}")


@app.command()
def match_candidate(candidate_id: int, top_k: int = 5):
    """Find top_k job matches for a candidate id."""
    cand = session.query(Candidate).get(candidate_id)

    if not cand:
        typer.echo("Candidate not found")
        raise typer.Exit()

    # Display candidate's skills first
    print("\nCandidate Skills:")
    if cand.skills:
        try:
            skills_list = json.loads(cand.skills)
            for skill in skills_list:
                print(f"- {skill}")
        except Exception:
            print(cand.skills)
    else:
        print("No skills found.")

    print("\nMatched Jobs:")

    # Prepare candidate embedding
    cand_emb = json_to_emb(cand.embedding).reshape(1, -1)

    # Get all jobs
    jobs = session.query(Job).all()
    job_embs = np.vstack([json.loads(j.embedding) for j in jobs]).astype('float32')

    # Try FAISS search, fall back to cosine
    try:
        index = build_faiss_index(job_embs)
        I, D = search_faiss(index, cand_emb, top_k=top_k)
        idxs = I[0]
        scores = D[0]
    except Exception:
        idxs, scores = topk_by_cosine(job_embs, cand_emb, top_k=top_k)
        idxs = idxs[0]
        scores = scores[0]

    # Build results, filtering out invalid scores
    results = []
    for idx, score in zip(idxs, scores):
        if score == -3.4028234663852886e+38:  # skip invalid match
            continue
        job = jobs[idx]
        results.append({
            "job_id": job.id,
            "title": job.title,
            "location": job.location,
            "score": float(score)
        })

    typer.echo(json.dumps(results, indent=2))


if __name__ == "__main__":
    app()
