# parser.py
import pdfplumber
import re
import json
from pathlib import Path
import spacy
from typing import Dict, List

nlp = spacy.load("en_core_web_sm")  # install via `python -m spacy download en_core_web_sm`

SKILLS_FILE = Path("skills.txt")

def load_skillset():
    return {s.strip().lower() for s in SKILLS_FILE.read_text().splitlines() if s.strip()}

def pdf_to_text(pdf_path: str) -> str:
    texts = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                texts.append(page_text)
    return "\n\n".join(texts)

def extract_skills(text: str, skills_master=None) -> List[str]:
    if skills_master is None:
        skills_master = load_skillset()
    text_lower = text.lower()
    found = set()
    # naive matching: check substrings and word boundaries
    for skill in skills_master:
        # match whole words or dot/plus variants (e.g., c++)
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found.add(skill)
    # also detect "X years" patterns with skill context
    return sorted(found)

def extract_location(text: str):
    # try to find 'Location: <city>' first
    m = re.search(r'location[:\-\s]+([A-Za-z ,\-]+)', text, re.IGNORECASE)
    if m:
        return m.group(1).strip()
    # fallback to NER
    doc = nlp(text[:3000])  # limit for speed
    gpes = [ent.text for ent in doc.ents if ent.label_ == "GPE"]
    return gpes[0] if gpes else None

def extract_experience_text(text: str):
    # heuristics: find sections labelled Experience / Work Experience / Professional Experience
    patterns = [r'(work experience[:\n])(.*?)(\n[A-Z][a-z]+?:|\Z)',
                r'(professional experience[:\n])(.*?)(\n[A-Z][a-z]+?:|\Z)',
                r'(experience[:\n])(.*?)(\n[A-Z][a-z]+?:|\Z)']
    for pat in patterns:
        m = re.search(pat, text, re.IGNORECASE | re.DOTALL)
        if m:
            return m.group(2).strip()
    # fallback: try to extract lines with 'years' or date ranges
    lines = text.splitlines()
    ex_lines = [ln for ln in lines if re.search(r'(\d{4}|\d+\s+years|\d+-\d+)', ln)]
    return "\n".join(ex_lines[:30])

def parse_resume(pdf_path: str) -> Dict:
    text = pdf_to_text(pdf_path)
    skills = extract_skills(text)
    location = extract_location(text)
    experience_text = extract_experience_text(text)
    # try to extract name/email quickly
    email = None
    m = re.search(r'[\w\.-]+@[\w\.-]+', text)
    if m: email = m.group(0)
    name = None
    # crude name guess: first line if it contains 2 words and letters
    first_line = text.strip().splitlines()[0] if text.strip().splitlines() else None
    if first_line and len(first_line.split()) <= 4 and re.search(r'[A-Za-z]', first_line):
        name = first_line.strip()
    return {
        "name": name or "Unknown",
        "email": email,
        "location": location,
        "skills": skills,
        "experience_text": experience_text,
        "raw_text": text
    }
