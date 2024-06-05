from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from db import Base
from datetime import datetime


class Phrase(BaseModel):
    text: str
    explanation: str

class PDFFile(BaseModel):
    id: int
    filename: str
    filepath: str


# Submissions table - manicmonk

class SubmissionSchema(BaseModel):
    id: Optional[int] = None
    student_id: int
    filename: str
    filepath: str
    upload_time: Optional[datetime] = None

    class Config:
        orm_mode = True



class Submission(Base):
    __tablename__ = 'submissions'

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, nullable=False)
    filename = Column(String(255), nullable=False)
    filepath = Column(String(255), nullable=False)
    upload_time = Column(DateTime, default=func.now())
