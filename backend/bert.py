from transformers import BertModel, BertTokenizer
import torch

# Load pre-trained BERT model and tokenizer
model = BertModel.from_pretrained('bert-base-uncased')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def encode_text(text):
    """Generate embeddings for input text using BERT."""
    # Tokenize and encode text for BERT input
    encoded_input = tokenizer(text, return_tensors='pt', max_length=512, truncation=True, padding='max_length')
    # Generate output from BERT
    with torch.no_grad():
        output = model(**encoded_input)
    # Extract embeddings from the last hidden state of the [CLS] token
    embeddings = output.last_hidden_state[:, 0, :].squeeze().numpy()
    return embeddings