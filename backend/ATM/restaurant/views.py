'''
restaurant backend
'''
from django.http import (
        HttpResponse, HttpResponseNotAllowed, JsonResponse,
        HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
        )
from json import JSONDecodeError
import json
from datetime import datetime
from haversine import haversine
from ..models import Restaurant, Profile, Review, Author
from ..utils import cos_sim_word
from ..review.utils import prefvec_update
from django.views.decorators.csrf import ensure_csrf_cookie

import math
# preferencVector
scale = 1
pivot = 1.5

def searched_restaurants(request, word=''):
    '''
    when user searchs restaurant
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            response_list = []
            res_query = ''
            if word != '':
                res_query = Restaurant.objects.filter(search_string__contains=word)
            else:
                res_query = Restaurant.objects.all()
            for restaurant in res_query:
                    #cur = (37.47835220754036, 126.95631398408709)
                # print(author.search_location.x)
                cur = (author.search_location.y, author.search_location.x)
                res_loc = (restaurant.location.y, restaurant.location.x)
                # print(haversine(cur, res_loc))
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                review_cnt = Review.objects.filter(restaurant = restaurant).count() + 2
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                if len(restaurant.thumbnail) != 0:
                    response_dict['img_url'] = restaurant.thumbnail[0]
                else: 
                    response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                res = sorted(restaurant_pref_dict.items(), key= lambda x: x[1], reverse=True)
                i = 0
                sorted_dict = {}
                while True:
                    if i == 3:
                        break
                    sorted_dict[res[i][0]] = res[i][1]
                    i += 1
                response_dict['preferenceVector'] = sorted_dict
                response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict,restaurant.avg_rating )
                response_dict['rate-review'] = response_dict['rate'] * math.log2(review_cnt)
                #print(response_dict['title'])
                #print('rate', response_dict['rate'])
                #print('ranking',response_dict['rate-review'])
                response_list.append(response_dict)
            #response list sorted by rate
            result_list = sorted(response_list, key = lambda x: x['rate-review'], reverse= True)
            return JsonResponse(result_list, safe=False, status = 200)
        return HttpResponse(status = 401)
    return HttpResponseNotAllowed(['GET'])

def restaurant_detail(request,restaurant_id):
    '''
    restaurant's detail page
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                restaurant = Restaurant.objects.get(id = restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status = 404)
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            restaurant_pref_vec = restaurant.preference_vector
            restaurant_attr_list = get_preference_attributes(restaurant_pref_vec)
            restaurant_pref_dict = {}
            for attr in restaurant_attr_list:
                restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.food_category
            response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict, restaurant.avg_rating )
            response_dict['difference'] = response_dict['rate'] - restaurant.avg_rating
            if len(restaurant.thumbnail) != 0:
                response_dict['img_url'] = restaurant.thumbnail[0]
                response_dict['img_url_list'] = restaurant.thumbnail
            else: 
                response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                response_dict['img_url_list'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
            response_dict['menu'] = restaurant.menu
            response_dict['time'] = restaurant.openTime
            response_dict['keywords'] = restaurant.keyword
            response_dict['urls'] = [
                restaurant.kakao_link,
                restaurant.naver_link]
            response_dict['location'] = restaurant.location.address_name
            response_dict['location_link'] = restaurant.map_link
            return JsonResponse(response_dict, status = 200)
        return HttpResponse(status = 401)
    return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def other_reviews(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                target = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)

            reviews_on_target = Review.objects.filter(restaurant_id=restaurant_id)

            naver = [
                    {
                        'id': review.id, 
                        'content': review.content, 
                        'rating': review.rating, 
                        'date': review.date.strftime('%Y/%m/%d'), 
                        'author_name': review.author.nickname,
                        }
                for review in reviews_on_target if review.site == 'naver']
            kakao = [
                    {
                        'id': review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d'),
                        'author_name': review.author.nickname,
                        }
                for review in reviews_on_target if review.site == 'kakao']
            atm = [
                    {
                        'id': review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d'),
                        'author_name': review.author.nickname,
                        }
                for review in reviews_on_target \
                        if review.site == 'atm' \
                            and review.author.id != request.user.id]

            other_review_list = {'naver': naver, 'kakao': kakao, 'atm': atm}
            return JsonResponse(
                other_review_list,
                safe=False)  # default status is 200
        else:
            return HttpResponseNotAllowed(['GET'])
    else:
        return HttpResponse(status=401)



@ensure_csrf_cookie
def my_reviews(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                restaurant = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)
            response_list = [
                    {
                        'id':review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d')
                        }
                    for review in \
                        Review.objects.filter(author__user_id=request.user.id, restaurant_id=restaurant_id)]
                    
            return JsonResponse(response_list, status=200, safe=False) 
        elif request.method == 'POST':
            try:
                req_data = json.loads(request.body.decode())
                content = req_data['content']
                rating = float(req_data['rating'])
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
            try:
                restaurant = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)
            date = datetime.now()
            author = Author.objects.get(user_id=request.user.id)
            new_review = Review(
                    restaurant=restaurant, 
                    author=author, 
                    content=content, 
                    rating=rating, 
                    date=date, 
                    site='atm') 
            new_review.save()
            response_dict = {
                'id': new_review.id,
                'content': new_review.content,
                'rating': new_review.rating,
                'date': new_review.date.strftime('%Y/%m/%d')}
            restaurant_prefvec = restaurant.preference_vector
            user_prefvec = author.user.profile.preference_vector
            avg_diff = (rating - restaurant.avg_rating) / 5.0
            prefvec_update(restaurant_prefvec, user_prefvec, avg_diff)

            return HttpResponse(
                content=json.dumps(response_dict),
                status=201)  # default status is 200
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
    else:
        return HttpResponse(status=401)


def get_preference_attributes(pref_vec):
    '''
    get preference vector's key
    '''
    no_need_attr = ['_state', 'id']
    attr_list = list(pref_vec.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr not in no_need_attr:
            new_attr_list.append(attr)
    return new_attr_list

def get_customized_rating(restaurant_pref, user_pref, avg_rating):
    '''
    get customized rating
    '''
    diff = 0
    for restaurant_factor in restaurant_pref:
        for user_factor in user_pref:
            if restaurant_pref[restaurant_factor] == 0 :
                continue
            similarity = cos_sim_word(user_factor, restaurant_factor)
            diff += similarity * (pivot -
                    abs(restaurant_pref[restaurant_factor] - user_pref[user_factor]))
    return round(avg_rating + scale * diff,2)
