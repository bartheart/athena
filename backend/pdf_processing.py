import fitz
import json
import re
import os
from logic import sentence_embedding
from sbert import encode_text
import tensorflow as tf
import torch


import fitz  # PyMuPDF
import json
import re

def process_key_answers(pdf_directory):
    """
    Process a PDF and extract answers, keeping track of question IDs.
    
    Returns:
    list: A list containing dictionaries for each answer along with its question ID.
    """
    pdf_path = os.path.join(pdf_directory, f"Key.pdf")
    all_answers = []

    try:
        document = fitz.open(pdf_path)
    except Exception as e:
        print(f"Failed to open {pdf_path}: {e}")
        return all_answers

    collecting_answer = False
    answer = ""
    current_question = None
    question_id = 0  # Initialize question_id

    # Loop through each page of the PDF
    for page in document:
        page_text = page.get_text()
        lines = page_text.split('\n')

        for line in lines:
            line = line.strip()

            # Detect a question start
            if re.match(r'^\d+\.', line):
                if collecting_answer and answer:
                    all_answers.append({
                        "question_id": question_id,
                        "answer": answer.strip().lower(), 
                        "answer_embedding": encode_text(answer.lower().strip()).tolist() 
                        
                    })
                question_id += 1  # Increment the question ID for each new question
                answer = ""  # Reset answer for the next round
                current_question = line
                collecting_answer = True  # Start collecting answer text after the question
            elif "?" in line and current_question:  # Question might continue on multiple lines
                current_question += " " + line
            elif collecting_answer:
                # Collect answer text only if it's not a continuation of a question
                if line and not line.endswith("?"):
                    answer += " " + line

    # Append the last answer if the document ends after an answer
    if collecting_answer and answer:
        all_answers.append({
            "question_id": question_id,
            "answer": answer.strip().lower(),
            "answer_embedding": encode_text(answer.lower().strip()).tolist() 

        })

    return all_answers


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
                            "student_id": i,
                            "question_id": question_id - 1,
                            "question": question.strip(),
                            "answer": answer.lower().strip(),
                            "answer_embedding": encode_text(answer.lower().strip()).tolist() 
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
                    "student_id": i,
                    "question_id": question_id - 1,
                    "question": question.strip(),
                    "answer": answer.lower().strip(),
                    "answer_embedding": encode_text(answer.lower().strip()).tolist() 
                })

    return all_answers

def cosine_similarity(vec1, vec2):
    """Calculate the cosine similarity between two vectors using PyTorch."""
    # Normalize the vectors using L2 norm
    vec1_norm = torch.nn.functional.normalize(vec1, p=2, dim=0)
    vec2_norm = torch.nn.functional.normalize(vec2, p=2, dim=0)
    # Calculate the cosine similarity
    cosine_sim = torch.dot(vec1_norm, vec2_norm)
    return cosine_sim.item() 



def compute_similarities(pdf_directory):
    """
    Compute cosine similarities between student answers and key answers for the same question IDs using PyTorch.
    
    Args:
    pdf_directory (str): Directory containing all the PDFs.

    Returns:
    list: A list containing cosine similarities for each matching question ID.
    """
    # Process key answers and student answers
    key_answers = process_key_answers(pdf_directory)
    student_answers = process_questions_from_text(pdf_directory)

    similarities = []

    # Dictionary to map question_id to key answer embeddings
    key_answer_dict = {answer['question_id']: torch.tensor(answer['answer_embedding'], dtype=torch.float32)
                       for answer in key_answers}

    # Iterate over each student answer
    for student_answer in student_answers:
        question_id = student_answer['question_id']
        if question_id in key_answer_dict:
            student_embedding = torch.tensor(student_answer['answer_embedding'], dtype=torch.float32)
            key_embedding = key_answer_dict[question_id]
            similarity = cosine_similarity(student_embedding, key_embedding)
            similarities.append({
                "student_id": student_answer["student_id"],
                "question_id": question_id,
                "question": student_answer["question"],
                "answer": student_answer["answer"],
                "similarity": float(similarity)  # Convert to Python float for compatibility
            })
    return similarities


def group_by_similarity(question_id, num_groupings, pdf_directory):
  
    similarities = compute_similarities(pdf_directory)
    # Filter responses for the specific question_id
    filtered_responses = [resp for resp in similarities if resp['question_id'] == question_id]
    
    # Sort responses by similarity score in descending order
    sorted_responses = sorted(filtered_responses, key=lambda x: x['similarity'], reverse=True)
    
    # Calculate the number of responses per group
    group_size = len(sorted_responses) // num_groupings
    
    grouped_responses = []
    
    # Assign group numbers based on the sorted order
    for index, response in enumerate(sorted_responses):
        # Determine the group number based on index
        group_number = (index // group_size) + 1
        # Cap the group number at num_groupings
        if group_number > num_groupings:
            group_number = num_groupings
        
        # Append the group number to the response
        response_with_group = response.copy()
        response_with_group['group'] = group_number
        
        grouped_responses.append(response_with_group)
    
    # Convert the list of dictionaries to JSON
    return grouped_responses


def questionAnswer(questionId, pdf_directory):
    # Assuming process_questions_from_text returns a list of dictionaries
    student_answers = process_questions_from_text(pdf_directory)
    
    # Find the first student answer that matches the given questionId
    for answer in student_answers:
        if answer["question_id"] == questionId:
            # Return a dictionary directly
            return {
                "student_id": answer["student_id"],
                "question_id": answer["question_id"],
                "question": answer["question"],
                "answer": answer["answer"]
            }
    
    # Return an empty dictionary or a meaningful message if no match is found
    return {"message": "No answer found for the specified question ID."}