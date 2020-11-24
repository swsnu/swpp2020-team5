from ATM.models import *

import json


with open('./restaurants.json') as json_file:
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
        )
        new_restaurant.save()
