from kor2vec import Kor2Vec
import time
import json



from numpy import dot
from numpy.linalg import norm
import numpy as np
def cos_sim(A, B):
    return dot(A, B)/(norm(A)*norm(B))

arr = []

arr.append(['매운','매콤한', '얼얼한', '자극적인'])
arr.append(['느끼하다'])
arr.append(['짠','짭잘한'])
arr.append(['단','달콤한'])   #arr.append(['달다','달콤한'])
arr.append(['고소한'])
arr.append(['싱거운','심심한','밍밍한'])
arr.append(['담백한'])
arr.append(['저렴한'])
arr.append(['푸짐한'])
arr.append(['웨이팅','기다리'])
arr.append(['혼밥', '혼자'])
arr.append(['바삭바삭'])
arr.append(['부드럽'])
arr.append(['불친절'])

food_arr = ['짜장면',\
            '쌀국수',\
            '후라이드치킨',\
            '김치찌개',\
            '티라미수',\
            '떡볶이',\
           ]

vec_arr = []

def get_vec(model):
    res = {}
    for same_list in arr:
        res[same_list[0]] = model.embedding(same_list[0],numpy=True).squeeze()
    for food in food_arr:
        res[food] = model.embedding(food,numpy=True).squeeze()
    with open("pref_and_food_embedding.json", "w") as json_file:
        json.dump(res, json_file)

def get_pref(model):
    for same_list in arr:
        # avg or first?
        vec_arr.append(model.embedding(same_list[0],numpy=True).squeeze())
    # filesave

def cal_sim_avg(model):
    total_score = 0
    total_comb = 0
    for same_list in arr:
        l = len(same_list)
        for i in range(l-1):
            for j in range(i+1,l):
                total_score += cos_sim(model.embedding(same_list[i],numpy=True).squeeze(), \
                                       model.embedding(same_list[j],numpy=True).squeeze())
                total_comb += 1
    return total_score / total_comb

def cal_diff_count_avg(model):
    total_score = 0
    total_comb = 0
    for index, same_list in enumerate(arr):
        l = len(same_list)
        for i in range(l-1):
            for j in range(i+1,l):
                same_sim = cos_sim(model.embedding(same_list[i],numpy=True).squeeze(), \
                                   model.embedding(same_list[j],numpy=True).squeeze())
                for other_index, other_same_list in enumerate(arr):
                    if index == other_index:
                        continue
                    for other in other_same_list:
                        total_comb += 2
                        if cos_sim(model.embedding(other, numpy=True).squeeze(), \
                                   model.embedding(same_list[i],numpy=True).squeeze()) < same_sim:
                            total_score +=1
                        if cos_sim(model.embedding(other, numpy=True).squeeze(), \
                                   model.embedding(same_list[j],numpy=True).squeeze()) < same_sim:
                            total_score +=1
    return total_score / total_comb
    
                

# 3가지, wiki, wiki+ours, ours
# 5 epochs wiki, 10 epochs ours
    
files = ["./model.kor2vec.ep2","./model.kor2vec.ep2.with_reviews","./model.kor2vec.ep0","./model.kor2vec.ep0.with_reviews", \
        "./model.kor2vec.ep1","./model.kor2vec.ep1.with_reviews", "./model.kor2vec.only_with_reviews", "./model.kor2vec.only_with_reviews_100"]

for file in files:
    kor2vec = Kor2Vec.load(file)
    score_sim = cal_sim_avg(kor2vec)
    score_dif = cal_diff_count_avg(kor2vec)
    print(f'{file} 의 점수: sim={score_sim}, dif={score_dif}')
"""
    print('cos',cos_sim(kor2vec.embedding('맵다',numpy=True).squeeze(), \
                                       kor2vec.embedding('느끼하다',numpy=True).squeeze()))

a=kor2vec.embedding("웨이팅",numpy=True)
st = time.time()
b =kor2vec.embedding("매운", numpy=True)
print(norm(a[0]))
print(norm(b[0]))
print(time.time() -st)
