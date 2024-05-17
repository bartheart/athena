from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import os 
from pdf_processing import process_questions_from_text


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins (update as needed)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Add OPTIONS
    allow_headers=["*"],  # Allow all headers (update as needed)
)




# Define the directory to serve PDF files from
pdf_directory = "../frontend/public/submissions"


class Phrase(BaseModel):
    text: str
    explanation: str


# file type definition for pdf files
class PDFFile(BaseModel):
    id: int
    filename: str
    filepath: str


# simulate database
fake_database = [
    PDFFile(id=1, filename="Student_1_Answers.pdf", filepath="Student_1_Answers.pdf"),
    PDFFile(id=2, filename="Student_2_Answers.pdf", filepath="Student_2_Answers.pdf"),
    PDFFile(id=3, filename="Student_3_Answers.pdf", filepath="Student_3_Answers.pdf"),
    PDFFile(id=4, filename="Student_4_Answers.pdf", filepath="Student_4_Answers.pdf"),
    PDFFile(id=5, filename="Student_5_Answers.pdf", filepath="Student_5_Answers.pdf"),
    PDFFile(id=6, filename="Student_6_Answers.pdf", filepath="Student_6_Answers.pdf"),
    PDFFile(id=7, filename="Student_7_Answers.pdf", filepath="Student_7_Answers.pdf"),
    PDFFile(id=8, filename="Student_8_Answers.pdf", filepath="Student_8_Answers.pdf"),
    PDFFile(id=9, filename="Student_9_Answers.pdf", filepath="Student_9_Answers.pdf"),
    PDFFile(id=10, filename="Student_10_Answers.pdf", filepath="Student_10_Answers.pdf"),
    PDFFile(id=11, filename="Student_11_Answers.pdf", filepath="Student_11_Answers.pdf"),
    PDFFile(id=12, filename="Student_12_Answers.pdf", filepath="Student_12_Answers.pdf"),
    PDFFile(id=13, filename="Student_13_Answers.pdf", filepath="Student_13_Answers.pdf"),
    PDFFile(id=14, filename="Student_14_Answers.pdf", filepath="Student_14_Answers.pdf"),
    PDFFile(id=15, filename="Student_15_Answers.pdf", filepath="Student_15_Answers.pdf"),
    PDFFile(id=16, filename="Student_16_Answers.pdf", filepath="Student_16_Answers.pdf"),
    PDFFile(id=17, filename="Student_17_Answers.pdf", filepath="Student_17_Answers.pdf"),
    PDFFile(id=18, filename="Student_18_Answers.pdf", filepath="Student_18_Answers.pdf"),
    PDFFile(id=19, filename="Student_19_Answers.pdf", filepath="Student_19_Answers.pdf"),
    PDFFile(id=20, filename="Student_20_Answers.pdf", filepath="Student_20_Answers.pdf"),
    PDFFile(id=21, filename="Student_21_Answers.pdf", filepath="Student_21_Answers.pdf"),
    PDFFile(id=22, filename="Student_22_Answers.pdf", filepath="Student_22_Answers.pdf"),
    PDFFile(id=23, filename="Student_23_Answers.pdf", filepath="Student_23_Answers.pdf"),
    PDFFile(id=24, filename="Student_24_Answers.pdf", filepath="Student_24_Answers.pdf"),
    PDFFile(id=25, filename="Student_25_Answers.pdf", filepath="Student_25_Answers.pdf"),
    PDFFile(id=26, filename="Student_26_Answers.pdf", filepath="Student_26_Answers.pdf"),
    PDFFile(id=27, filename="Student_27_Answers.pdf", filepath="Student_27_Answers.pdf"),
    PDFFile(id=28, filename="Student_28_Answers.pdf", filepath="Student_28_Answers.pdf"),
    PDFFile(id=29, filename="Student_29_Answers.pdf", filepath="Student_29_Answers.pdf"),
   
]


# route calls
@app.get("/")
def shush():
    return("Home route")

# API endpoint to fetch metadata of all PDF files
@app.get("/pdf_files", response_model=List[PDFFile])
async def get_pdf_files():
    return fake_database


# Serve PDF files
@app.get("/pdf/{filename}", response_class=FileResponse)
async def read_pdf(filename: str):
    pdf_path = os.path.join(pdf_directory, filename)
    return FileResponse(pdf_path)

# endpoint to process the answers
@app.get("/process_answers", response_model=List[dict])
async def process_answers():
    return process_questions_from_text(pdf_directory)

@app.post("/analyze")
async def analyze_phrases(phrases: List[Phrase]):
    # Process the accumulated phrases
    concatenated_text = ''.join(phrase.text for phrase in phrases)
    concatenated_explanations = ''.join(phrase.explanation for phrase in phrases)

    # Print concatenated results to the console
    print("Concatenated Text:", concatenated_text)
    print("Concatenated Explanations:", concatenated_explanations)

    return {"concatenated_text": concatenated_text, "concatenated_explanations": concatenated_explanations}

