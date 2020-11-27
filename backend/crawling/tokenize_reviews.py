from konlpy.tag import Hannanum, Okt

from process_tokens import tokenize_and_filter, weight_tokens

import requests
import json
import time

restaurants = json.loads(open("restaurants.json").read())
reviewslist = json.loads(open("reviews.json").read())
mangos = json.loads(open("reviews_mango.json").read())
tokenized_reviews = open("reviews_tokenized.json", "a")

tokenized_reviews.write("\n")
start_at = 0
end_at   = 500
currently_at = 0
hannanum = Hannanum()
okt = Okt()

for restaurant in restaurants:

  currently_at += 1
  if end_at == currently_at:
    print("tokenize: ending at " + str(currently_at))
    exit()
  print("tokenize: currently at " + str(currently_at))
  if start_at > currently_at:
    continue

  restaurant_name = restaurant["name"]
  restaurant_id = restaurant["Id"]
  try:
    reviews_dict = list(filter(lambda restaurant: restaurant["name"] == restaurant_name, reviewslist))[0]
    reviews_mango = list(filter(lambda restaurant: restaurant["Id"] == restaurant_id, mangos))[0]["text"]
  except IndexError:
    print("Missing something at: " + restaurant_name)
  reviews = reviews_dict["kakao"] + reviews_dict["naver"]
  reviews_text = reviews_mango
  for review in reviews:
    reviews_text += (review["content"] + " ")
  reviews_tokenized = tokenize_and_filter(reviews_text, hannanum, okt)
  reviews_tokenized_and_weighed = weight_tokens(reviews_tokenized)
  result = {}
  result["Id"] = restaurant_id
  result["tokenized"] = reviews_tokenized
  result["weighed"] = reviews_tokenized_and_weighed
  json.dump(result, tokenized_reviews, indent=2, ensure_ascii=False)
  tokenized_reviews.write(",\n")
