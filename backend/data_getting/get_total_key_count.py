import json

pref_dict = {}
total_count_dict = {}

with open('./ATM/embedding/word_to_pref.json', "r", encoding="utf-8") as json_file:
    pref_dict = json.load(json_file)


with open('./crawling/reviews_tokenized.json', "r", encoding="utf-8") as json_file:
    keywords = json.load(json_file)
    for res in keywords:
        key_weight_dict = res['weighed']
        for_pref_vec = {}
        our_key_total = 0
        for key in key_weight_dict.keys():
            if key not in pref_dict:
                continue
            our_key_total += key_weight_dict[key]
            if pref_dict[key] not in total_count_dict:
                total_count_dict[pref_dict[key]] = \
                    key_weight_dict[key]
            else:
                total_count_dict[pref_dict[key]] += \
                    key_weight_dict[key]

with open("./ATM/embedding/word_to_frequency.json", "w") as json_file:
    json.dump(total_count_dict, json_file, ensure_ascii=False, indent="\t")
print('total', total_count_dict)
