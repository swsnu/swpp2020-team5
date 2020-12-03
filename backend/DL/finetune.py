import torch
from kor2vec2.kor2vec import Kor2Vec

kor2vec = Kor2Vec.load("./model.kor2vec.ep1")
torch.save(kor2vec.state_dict(), './state')

model = Kor2Vec()
#model.load_state_dict(torch.load('./state'))

print('HI')
model.train("./allreviews.txt", batch_size=128) # takes some time

model.save("./model.kor2vec.only_with_reviews_100") # saving embedding
print("FIN")
