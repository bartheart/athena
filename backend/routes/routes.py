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

pdf_directory = "../athena_frontend/public/submissions"

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

@router.get("/process_answers/{question_id}", response_model=List[dict])
async def process_answers(question_id: int):
    try:
        # Assuming group_by_similarity function is defined elsewhere and imported
        # Make sure `pdf_directory` is defined or passed correctly to your function
        result = group_by_similarity(question_id, 4, pdf_directory)
        if not result:
            # No results found for the given question_id
            raise HTTPException(status_code=404, detail=f"No answers found for question_id: {question_id}")
        return result
    except Exception as e:
        # Log the exception details or handle it appropriately
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


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
