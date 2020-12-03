import json

arr = []
arr.append(['매운','매콤한', '얼얼한', '자극적인',
'맵다','매콤하다','얼얼하다','자극적이다'])
arr.append(['느끼한','느끼하다'])
arr.append(['짭잘한','짠','짜다','짭짤하다'])
arr.append(['달달한','단','달콤한','달다','달콤하다'])  
arr.append(['고소한','고소하다'])
arr.append(['싱거운','심심한','밍밍한','싱겁다','심심하다','밍밍하다'])
arr.append(['담백한','담백하다'])
arr.append(['저렴한','저렴하다'])
arr.append(['웨이팅이있는','웨이팅','기다리','기다리다'])
arr.append(['혼밥하기좋은','혼밥', '혼자'])
arr.append(['바삭바삭한','바삭바삭','바삭바삭하다'])
arr.append(['부드러운','부드럽','부드럽다'])
arr.append(['불친절한','불친절','불친절하다'])
new_dict = {}
for same_list in arr:
    for word in same_list:
        new_dict[word] = same_list[0]

with open("word_to_pref.json", "w") as json_file:
    json.dump(new_dict, json_file, ensure_ascii=False, indent="\t")

"""
food_arr = ['짜장면',\
            '쌀국수',\
            '후라이드치킨',\
            '김치찌개',\
            '티라미수',\
            '떡볶이',\
            '웨이팅',\
            '혼밥'
           ]

"""
