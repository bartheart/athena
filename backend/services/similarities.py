import torch
from .pdf_processing import process_key_answers, process_questions_from_text

def cosine_similarity(vec1, vec2):
    """Calculate the cosine similarity between two vectors using PyTorch."""
    vec1_norm = torch.nn.functional.normalize(vec1, p=2, dim=0)
    vec2_norm = torch.nn.functional.normalize(vec2, p=2, dim=0)
    cosine_sim = torch.dot(vec1_norm, vec2_norm)
    return cosine_sim.item()

def compute_similarities(pdf_directory):
    key_answers = process_key_answers(pdf_directory)
    student_answers = process_questions_from_text(pdf_directory)

    similarities = []

    key_answer_dict = {answer['question_id']: torch.tensor(answer['answer_embedding'], dtype=torch.float32)
                       for answer in key_answers}

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
                "similarity": float(similarity)
            })
    return similarities

def group_by_similarity(question_id, num_groupings, pdf_directory):
    similarities = compute_similarities(pdf_directory)
    filtered_responses = [resp for resp in similarities if resp['question_id'] == question_id]
    sorted_responses = sorted(filtered_responses, key=lambda x: x['similarity'], reverse=True)
    group_size = len(sorted_responses) // num_groupings
    grouped_responses = []

    for index, response in enumerate(sorted_responses):
        group_number = (index // group_size) + 1
        if group_number > num_groupings:
            group_number = num_groupings
        response_with_group = response.copy()
        response_with_group['group'] = group_number
        grouped_responses.append(response_with_group)

    return grouped_responses
