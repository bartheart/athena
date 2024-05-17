import tensorflow_hub as hub

class UniversalSentenceEncoder:
    model = None

    @staticmethod
    def get_model():
        if UniversalSentenceEncoder.model is None:
            print("Loading the Universal Sentence Encoder model...")
            UniversalSentenceEncoder.model = hub.load('https://tfhub.dev/google/universal-sentence-encoder/4')
        return UniversalSentenceEncoder.model

def sentence_embedding(sentence):
    USE_model = UniversalSentenceEncoder.get_model()
    try:
        embeddings = USE_model([sentence])
        return embeddings[0].numpy()  # Convert to numpy array for easier handling if required
    except Exception as e:
        print(f"Error in generating embedding: {e}")
        return None

