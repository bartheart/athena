from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
from typing import List, Annotated
from services import group_by_similarity
from models.models import Phrase, PDFFile, SubmissionSchema,Submission
import models
from db import engine, SessionLocal
from mocks import fake_database
from sqlalchemy.orm import Session
import os

router = APIRouter()

# models.Base.metadata.create_all(bind=engine)

pdf_directory = "../frontend/public/submissions"

@router.get("/")
async def home():
    return "Home route"

@router.get("/pdf_files", response_model=List[PDFFile])
async def get_pdf_files():
    return fake_database

@router.get("/pdf/{filename}", response_class=FileResponse)
async def read_pdf(filename: str):
    pdf_path = os.path.join(pdf_directory, filename)
    return FileResponse(pdf_path)

@router.get("/process_answers", response_model=List[dict])
async def process_answers():
    return group_by_similarity(23, 4, pdf_directory)

@router.post("/analyze")
async def analyze_phrases(phrases: List[Phrase]):
    concatenated_text = ''.join(phrase.text for phrase in phrases)
    concatenated_explanations = ''.join(phrase.explanation for phrase in phrases)
    print("Concatenated Text:", concatenated_text)
    print("Concatenated Explanations:", concatenated_explanations)
    return {"concatenated_text": concatenated_text, "concatenated_explanations": concatenated_explanations}



# database configuration
# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post("/upload")
async def upload_file(student_id: int, filename: str, filepath: str, db: db_dependency):
    db_submission = models.Submission(student_id=student_id, filename=filename, filepath=filepath)
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return {"message": "File uploaded successfully", "id": db_submission.id}
