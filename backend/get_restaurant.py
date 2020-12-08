from ATM.models import *

import json

pref_dict = {}
total_count_dict = {}

max_pref_value = 5.0

debug_sum=0
debug_max=0
debug_min=0
debug_count=0
debug_10=[0,0,0,0,0,0]



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
            search_string=restaurant['searchString']
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
            debug_count += 1
            if pref_value>debug_max:
                debug_max = pref_value
            if pref_value<debug_min:
                debug_min = pref_value
            debug_10[int(pref_value/10)] += 1
            debug_sum += pref_value

            # 0~10 is only used. This is 90% of total data
            pref_value /= 2
            if pref_value > max_pref_value:
                pref_value = max_pref_value
            pref[key] = pref_value
        pref.save()
        new_res.preference_vector = pref
        new_res.save()

print('keyword id not matched: ', no_res)
print('mean: ',debug_sum/debug_count, 'max: ', debug_max, \
    'min: ',debug_min)
for i in range(len(debug_10)):
    print(i, debug_10[i])

        
"""
with open("./ATM/embedding/word_to_frequency.json","w") as json_file:
    json.dump(total_count_dict, json_file, ensure_ascii=False, indent="\t")
with open("./ATM/embedding/word_to_maxcount.json","w") as json_file:
    json.dump(max_count_dict, json_file, ensure_ascii=False, indent="\t")
print('total',total_count_dict)
print('max',max_count_dict)
"""
