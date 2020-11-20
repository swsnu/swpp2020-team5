from numpy import dot
from numpy.linalg import norm
import numpy as np

def cos_sim_word(A, B):
       A_emb = inference(A)
       B_emb = inference(B)
       return cos_sim(A,B)

# argument needs to be np.array
def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))

def inference(word: str) -> list:
    return [0.1, 0.5]