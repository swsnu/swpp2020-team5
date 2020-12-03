from ATM.models import *

import json

pref_dict = {}
total_count_dict = {}

with open('./ATM/embedding/word_to_pref.json',"r", encoding="utf-8") as json_file:
    pref_dict = json.load(json_file)
    
with open('./ATM/embedding/word_to_frequency.json',"r", encoding="utf-8") as json_file:
    total_count_dict = json.load(json_file)

total_count = 0
for word in total_count_dict.keys():
    total_count += total_count_dict[word]

with open('./crawling/restaurants.json') as json_file:
    restaurants = json.load(json_file)
    for i, restaurant in enumerate(restaurants):
        if i < 5:
            continue
        location = Location(
            address_name=restaurant['location']['address_name'],
            x=restaurant['location']['x'],
            y=restaurant['location']['y'],
        )
        location.save()
        new_restaurant = Restaurant(
            id=restaurant['Id'],
            name=restaurant['name'],
            location=location,
            avg_rating=restaurant['avgRating'],
            menu=restaurant['menu'],
            openTime=restaurant['openTime'],
            kakao_link=restaurant['kakaoLink'],
            naver_link=restaurant['naverLink'],
            thumbnail=restaurant['thumbNail'],
            map_link=restaurant['mapLink'],
        )
        new_restaurant.save()


no_res = 0
with open('./crawling/reviews_tokenized.json',"r", encoding="utf-8") as json_file:
    keywords = json.load(json_file)
    for res in keywords:
        try:
            new_res = Restaurant.objects.get(id=res['Id'])
        except:
            no_res += 1
            continue

        key_weight_dict = res['weighed']
        for_pref_vec = {}
        our_key_total = 0
        for key, freq in key_weight_dict.items():
            if key not in pref_dict:
                continue
            our_key_total += freq
            if pref_dict[key] not in for_pref_vec:
                for_pref_vec[pref_dict[key]] = freq
            else:
                for_pref_vec[pref_dict[key]] += freq
        
        key_weight_sorted = sorted(key_weight_dict.items(), reverse=True,
            key=lambda item: item[1])
        if len(key_weight_sorted) > 30:
            key_weight_sorted = key_weight_sorted[:30]
        new_res.keyword = { item[0]:item[1] for item in key_weight_sorted }
        pref = PreferenceVector()
        for key in for_pref_vec.keys():
            pref_value = for_pref_vec[key] / our_key_total * total_count / \
                        total_count_dict[key]
            if pref_value > 1:
                pref_value = 1.0
            pref[key] = pref_value
        pref.save()
        new_res.preference_vector = pref
        new_res.save()

print('keyword id not matched: ', no_res)
        
"""
with open("./ATM/embedding/word_to_frequency.json","w") as json_file:
    json.dump(total_count_dict, json_file, ensure_ascii=False, indent="\t")
with open("./ATM/embedding/word_to_maxcount.json","w") as json_file:
    json.dump(max_count_dict, json_file, ensure_ascii=False, indent="\t")
print('total',total_count_dict)
print('max',max_count_dict)
"""
