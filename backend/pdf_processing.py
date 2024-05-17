import fitz
import json
import re
import os
from logic import sentence_embedding

def process_questions_from_text(pdf_directory):

    all_answers = []

    for i in range(1, 29):  # Assuming PDFs are named from 1 to 28
        pdf_path = os.path.join(pdf_directory, f"Student_{i}_Answers.pdf")

        # Attempt to open the PDF file
        try:
            document = fitz.open(pdf_path)
        except Exception as e:
            print(f"Failed to open {pdf_path}: {e}")
            continue

        question_id = 1
        question = ""
        answer = ""
        collecting_answer = False

        # Loop through each page of the PDF
        for page in document:
            page_text = page.get_text()
            lines = page_text.split('\n')

            for line in lines:
                line = line.strip()
                
                # Check if the line starts with a number and period (e.g., "27.")
                if re.match(r'^\d+\.', line):
                    # Save previous question and answer
                    if question and answer:
                        all_answers.append({
                            "student_id" : i,
                            "question_id": question_id - 1,
                            "question": question.strip(),
                            "answer": answer.strip(),
                            "embedding": sentence_embedding(answer.strip()).tolist() 
                        })
                    # Reset for new question
                    question = line
                    answer = ""
                    collecting_answer = False
                    question_id += 1
                elif "?" in line:
                    question += " " + line
                    collecting_answer = True
                elif collecting_answer:
                    answer += " " + line
                else:
                    question += " " + line

            # Save the last question and answer
            if question and answer:
                all_answers.append({
                    "student_id" : i,
                    "question_id": question_id - 1,
                    "question": question.strip(),
                    "answer": answer.strip(),
                    "embedding": sentence_embedding(answer.strip()).tolist() 
                })

    return all_answers