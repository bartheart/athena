# app/services/__init__.py

from .bert import encode_text
from .embedding import sentence_embedding
from .pdf_processing_2 import process_key_answers, process_questions_from_text
from .similarities import compute_similarities, group_by_similarity, cosine_similarity
