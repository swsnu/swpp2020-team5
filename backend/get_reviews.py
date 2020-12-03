from ATM.models import *

import json
from datetime import date

with open('./reviews.json') as json_file:
    reviews = json.load(json_file)
    
    no_rating_review_count = 0
    for i, restaurant_review in enumerate(reviews):
        for site_name in ['naver', 'kakao']:
            if not restaurant_review[site_name]:
                continue
            for review in restaurant_review[site_name]:
                if review['rating'] is None: 
                    no_rating_review_count += 1
                    review['rating'] = 0
                date_values = review['date'].split('.')
                new_review = Review(
                    restaurant=Restaurant.objects.get(id=review['restaurant']),
                    other_site_author=review['author'],
                    date=date(int(date_values[0]),
                          int(date_values[1]),
                          int(date_values[2])),
                    rating=float(review['rating']),
                    content=review['content'],
                    site=site_name,
                )
                new_review.save()
    print('no rating reviews Num: ',no_rating_review_count)