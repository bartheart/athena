from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from typing import List
import os
from services import group_by_similarity
from models.models import Phrase, PDFFile
from mocks import fake_database

router = APIRouter()

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
