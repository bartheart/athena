from transformers import BertModel, BertTokenizer
import torch

# Load pre-trained BERT model and tokenizer
bert_model = BertModel.from_pretrained('bert-base-uncased')
bert_tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

def encode_text(text):
    """Generate embeddings for input text using BERT."""
    encoded_input = bert_tokenizer(text, return_tensors='pt', max_length=512, truncation=True, padding='max_length')
    with torch.no_grad():
        output = bert_model(**encoded_input)
    embeddings = output.last_hidden_state[:, 0, :].squeeze().numpy()
    return embeddings
