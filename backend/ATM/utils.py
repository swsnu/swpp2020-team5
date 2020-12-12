from numpy import dot
from numpy.linalg import norm
import json
import numpy as np
# import numpy as np

embedding = {}
with open("./ATM/embedding/embedding_first_1.json", "r", encoding="utf-8") as fp:
    embedding = json.load(fp)


def cos_sim_word(word_1, word_2):
    emb_1 = embedding[word_1]
    emb_2 = embedding[word_2]
    return cos_sim(np.array(emb_1), np.array(emb_2))

# argument needs to be np.array


def cos_sim(emb_1, emb_2):
    return dot(emb_1, emb_2) / (norm(emb_1) * norm(emb_2))
