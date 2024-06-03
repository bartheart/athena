from fastapi import APIRouter
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
