from sentence_transformers import SentenceTransformer, util

# Load pre-trained BERT model and tokenizer
model = SentenceTransformer('all-mpnet-base-v2')


def encode_text(text):
    """Generate embeddings for input text using Sentence Transformers."""
    # Generate embeddings directly using the model
    embeddings = model.encode(text)
    return embeddings
