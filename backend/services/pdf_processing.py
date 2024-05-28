import fitz
import re
import os
from .bert import encode_text

def process_key_answers(pdf_directory):
    pdf_path = os.path.join(pdf_directory, "Key.pdf")
    all_answers = []

    try:
        document = fitz.open(pdf_path)
    except Exception as e:
        print(f"Failed to open {pdf_path}: {e}")
        return all_answers

    collecting_answer = False
    answer = ""
    question_id = 0

    for page in document:
        page_text = page.get_text()
        lines = page_text.split('\n')

        for line in lines:
            line = line.strip()
            if re.match(r'^\d+\.', line):
                if collecting_answer and answer:
                    all_answers.append({
                        "question_id": question_id,
                        "answer": answer.strip().lower(),
                        "answer_embedding": encode_text(answer.lower().strip()).tolist()
                    })
                question_id += 1
                answer = ""
                collecting_answer = True
            elif "?" in line:
                collecting_answer = True
            elif collecting_answer:
                if line and not line.endswith("?"):
                    answer += " " + line

    if collecting_answer and answer:
        all_answers.append({
            "question_id": question_id,
            "answer": answer.strip().lower(),
            "answer_embedding": encode_text(answer.lower().strip()).tolist()
        })

    return all_answers

def process_questions_from_text(pdf_directory):
    all_answers = []

    for i in range(1, 29):
        pdf_path = os.path.join(pdf_directory, f"Student_{i}_Answers.pdf")
        try:
            document = fitz.open(pdf_path)
        except Exception as e:
            print(f"Failed to open {pdf_path}: {e}")
            continue

        question_id = 1
        question = ""
        answer = ""
        collecting_answer = False

        for page in document:
            page_text = page.get_text()
            lines = page_text.split('\n')

            for line in lines:
                line = line.strip()
                if re.match(r'^\d+\.', line):
                    if question and answer:
                        all_answers.append({
                            "student_id": i,
                            "question_id": question_id - 1,
                            "question": question.strip(),
                            "answer": answer.lower().strip(),
                            "answer_embedding": encode_text(answer.lower().strip()).tolist()
                        })
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

            if question and answer:
                all_answers.append({
                    "student_id": i,
                    "question_id": question_id - 1,
                    "question": question.strip(),
                    "answer": answer.lower().strip(),
                    "answer_embedding": encode_text(answer.lower().strip()).tolist()
                })

    return all_answers
