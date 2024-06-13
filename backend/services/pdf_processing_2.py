import fitz  # PyMuPDF
from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
import torch
import re
import os
from .bert import encode_text

# Load tokenizer and model
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertForQuestionAnswering.from_pretrained('distilbert-base-uncased')

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Function to find the start and end positions of the answer in the text
def answer_question(question, text):
    inputs = tokenizer.encode_plus(question, text, add_special_tokens=True, return_tensors="pt", truncation=True, max_length=512)
    input_ids = inputs["input_ids"].tolist()[0]

    outputs = model(**inputs)
    answer_start_scores, answer_end_scores = outputs.start_logits, outputs.end_logits
    answer_start = torch.argmax(answer_start_scores)
    answer_end = torch.argmax(answer_end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    return answer

# Function to split text into chunks
def split_text(text, max_length=512):
    tokens = tokenizer.tokenize(text)
    chunks = []
    current_chunk = []
    current_length = 0

    for token in tokens:
        token_length = len(token)
        if current_length + token_length > max_length:
            chunks.append(tokenizer.convert_tokens_to_string(current_chunk))
            current_chunk = [token]
            current_length = token_length
        else:
            current_chunk.append(token)
            current_length += token_length

    if current_chunk:
        chunks.append(tokenizer.convert_tokens_to_string(current_chunk))

    return chunks

# Function to extract questions and answers from the text
def extract_questions_and_answers(text):
    qa_pairs = []
    pattern = re.compile(r'(\d+\.\s+.*?)(?=(\d+\.\s+)|$)', re.DOTALL)
    matches = pattern.findall(text)

    for match in matches:
        question_match = re.match(r'(\d+\.\s+.*?\?)', match[0], re.DOTALL)
        if question_match:
            question = question_match.group(1).strip()
            answer = match[0][len(question):].strip()
            qa_pairs.append((question, answer))

    return qa_pairs

# Main function to process questions from multiple PDFs
def process_questions_from_text(pdf_directory):
    all_answers = []

    for i in range(1, 30):  # Assuming PDFs are named from 1 to 29
        pdf_path = os.path.join(pdf_directory, f"Student_{i}_Answers.pdf")

        # Attempt to open the PDF file
        try:
            text = extract_text_from_pdf(pdf_path)
        except Exception as e:
            print(f"Failed to open {pdf_path}: {e}")
            continue

        qa_pairs = extract_questions_and_answers(text)

        for question_id, (question, answer) in enumerate(qa_pairs, 1):
            all_answers.append({
                "student_id": i,
                "question_id": question_id,
                "question": question.strip(),
                "answer": answer.lower().strip(),
                "answer_embedding": encode_text(answer.lower().strip()).tolist()
            })

    return all_answers

def process_key_answers(pdf_directory):
    all_answers = []

    pdf_path = os.path.join(pdf_directory, "Key.pdf")

    # Attempt to open the PDF file
    try:
        text = extract_text_from_pdf(pdf_path)
    except Exception as e:
        print(f"Failed to open {pdf_path}: {e}")
        return all_answers

    qa_pairs = extract_questions_and_answers(text)

    for question_id, (question, answer) in enumerate(qa_pairs, 1):
        all_answers.append({
            "question_id": question_id,
            "question": question.strip(),
            "answer": answer.lower().strip(),
            "answer_embedding": encode_text(answer.lower().strip()).tolist()
        })

    return all_answers
