from numpy import dot
from numpy.linalg import norm
import numpy as np

def cos_sim_word(A, B):
    A_emb = inference(A)
    B_emb = inference(B)
    return cos_sim(A_emb, B_emb)

# argument needs to be np.array
def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))

def get_embedding(word: str):
    return [0.1, 0.5]

def inference(A):
    return np.array([1.1,1.1])