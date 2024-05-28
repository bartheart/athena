from pydantic import BaseModel

class Phrase(BaseModel):
    text: str
    explanation: str

class PDFFile(BaseModel):
    id: int
    filename: str
    filepath: str