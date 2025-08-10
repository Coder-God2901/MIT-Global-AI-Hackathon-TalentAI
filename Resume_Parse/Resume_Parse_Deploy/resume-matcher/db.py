# db.py
from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker
import json

Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    location = Column(String, nullable=True)
    skills = Column(Text, nullable=True)           # JSON list
    experience_text = Column(Text, nullable=True)  # raw experience section
    embedding = Column(Text, nullable=True)        # JSON list (float)

class Job(Base):
    __tablename__ = "jobs"
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=True)
    requirements = Column(Text, nullable=True)
    embedding = Column(Text, nullable=True)

def get_engine(db_path="sqlite:///resumes.db"):
    return create_engine(db_path, connect_args={"check_same_thread": False})

def get_session(engine):
    return sessionmaker(bind=engine)()

def init_db(engine):
    Base.metadata.create_all(engine)
