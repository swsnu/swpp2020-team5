from numpy import dot
from numpy.linalg import norm
# import numpy as np


def cos_sim_word(word_1, word_2):
    emb_1 = get_embedding(word_1)
    emb_2 = get_embedding(word_2)
    return cos_sim(emb_1, emb_2)

# argument needs to be np.array


def cos_sim(emb_1, emb_2):
    return dot(emb_1, emb_2) / (norm(emb_1) * norm(emb_2))


def get_embedding(word: str):
    word += ''
    return [0.1, 0.5]
