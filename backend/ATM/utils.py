import json
import numpy as np
from numpy import dot
from numpy.linalg import norm
# import numpy as np

class Constants:
    service_pref_list = ['저렴한', '혼밥하기좋은', '웨이팅이있는', '불친절한']

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

# 0 -> 저렴한, 1 -> 혼밥하기좋은, 2 -> 웨이팅이있는, 3 -> 불친절한
def set_service_pref(pref_vec, service_option_list):
    pref_vec['저렴한'] = 2.5 * (2-service_option_list[0]) # +
    pref_vec['혼밥하기좋은'] = 2.5 * (2-service_option_list[1]) # +
    pref_vec['웨이팅이있는'] = 2.5 * (service_option_list[2]) # -
    pref_vec['불친절한'] = 2.5 * (2-service_option_list[3])  # -

