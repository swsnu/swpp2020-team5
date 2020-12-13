'''
restaurant backend
'''
import json
import math
from json import JSONDecodeError
from datetime import datetime
from haversine import haversine
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import (
    HttpResponse, HttpResponseNotAllowed, JsonResponse,
    HttpResponseBadRequest
)
from ..models import Restaurant, Profile, Review, Author
from ..utils import cos_sim_word, Constants
from ..review.utils import prefvec_update
from .resource import link

service_pref_list = Constants.service_pref_list

# preferencVector
scale = 3
pivot = 1.5

MIN_RAW_RATING = -10
MAX_RAW_RATING = 20

MAX_CUSTOMIZED_RATING = 5
#MIN_CUSTOMIZED_RATING = 0

MAX_REVIEW_COUNT = 1000


def searched_restaurants(request, word=''):
    '''
    when user searchs restaurant
    '''
    debug_min = -500
    if request.method == 'GET':
        if request.user.is_authenticated:
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_food_category = author.food_category
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            response_list = []
            res_query = ''
            if word != '':
                res_query = Restaurant.objects.filter(
                    search_string__contains=word)
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
                #print(restaurant.food_category)
                if not author_food_category[restaurant.food_category]:
                    continue
                response_dict = {}
                review_cnt = Review.objects.filter(
                    restaurant=restaurant).count() + 2
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                response_dict['img_url_list'] = restaurant.thumbnail
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                res = sorted(
                    restaurant_pref_dict.items(),
                    key=lambda x: x[1],
                    reverse=True)
                i = 0
                sorted_dict = {}
                while True:
                    if i == 3:
                        break
                    sorted_dict[res[i][0]] = res[i][1]
                    i += 1
                response_dict['preferenceVector'] = sorted_dict
                response_dict['rate'] = get_customized_rating(
                    restaurant_pref_dict, author_pref_dict, restaurant.avg_rating, review_cnt)
                if debug_min < response_dict['rate']:
                    debug_min = response_dict['rate']

                response_list.append(response_dict)
            # response list sorted by rate
            result_list = sorted(
                response_list,
                key=lambda x: x['rate'],
                reverse=True)
            print('min ', debug_min)
            return JsonResponse(result_list, safe=False, status=200)
        return HttpResponse(status=401)
    return HttpResponseNotAllowed(['GET'])


def restaurant_detail(request, restaurant_id):
    '''
    restaurant's detail page
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                restaurant = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            restaurant_pref_vec = restaurant.preference_vector
            review_cnt = Review.objects.filter(
                restaurant=restaurant).count() + 2
            restaurant_attr_list = get_preference_attributes(
                restaurant_pref_vec)
            restaurant_pref_dict = {}
            for attr in restaurant_attr_list:
                restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.food_category
            response_dict['rate'] = get_customized_rating(
                restaurant_pref_dict, author_pref_dict, restaurant.avg_rating, review_cnt)
            response_dict['difference'] = response_dict['rate'] \
                - scale_rating(restaurant.avg_rating)
            if len(restaurant.thumbnail) != 0:
                response_dict['img_url'] = restaurant.thumbnail[0]
                response_dict['img_url_list'] = restaurant.thumbnail
            else:
                response_dict['img_url'] = link.default_image
                response_dict['img_url_list'] = [link.default_image]
            response_dict['menu'] = restaurant.menu
            response_dict['time'] = restaurant.openTime
            response_dict['keywords'] = restaurant.keyword
            response_dict['urls'] = [
                restaurant.kakao_link,
                restaurant.naver_link]
            response_dict['location'] = restaurant.location.address_name
            response_dict['location_link'] = restaurant.map_link
            return JsonResponse(response_dict, status=200)
        return HttpResponse(status=401)
    return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def other_reviews(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                target = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)

            reviews_on_target = Review.objects.filter(
                restaurant_id=restaurant_id)

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
                for review in reviews_on_target
                if review.site == 'atm']

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
                    'id': review.id,
                    'content': review.content,
                    'rating': review.rating,
                    'date': review.date.strftime('%Y/%m/%d')
                }
                for review in
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


def scale_rating(raw_rating):
    if raw_rating < MIN_RAW_RATING:
        return 0
    if raw_rating > MAX_RAW_RATING:
        return MAX_CUSTOMIZED_RATING
    return round((raw_rating - MIN_RAW_RATING) * MAX_CUSTOMIZED_RATING
                 / (MAX_RAW_RATING - MIN_RAW_RATING), 2)


def get_customized_rating(restaurant_pref, user_pref, avg_rating, review_cnt):
    '''
    get customized rating
    '''
    diff = 0
    for restaurant_factor in restaurant_pref:
        if restaurant_factor in service_pref_list:
            continue
        if restaurant_pref[restaurant_factor] == 0:
            continue
        for user_factor in user_pref:
            if user_factor in service_pref_list:
                continue
            similarity = cos_sim_word(user_factor, restaurant_factor)
            diff += similarity * \
                (pivot - abs(restaurant_pref[restaurant_factor] - user_pref[user_factor]))
    review_cnt_truncated = MAX_REVIEW_COUNT \
        if review_cnt > MAX_REVIEW_COUNT \
        else review_cnt

    for factor in ['저렴한', '혼밥하기좋은']:
        diff += pivot * (user_pref[factor] * restaurant_pref[factor]) / 25
    for factor in ['웨이팅이있는', '불친절한']:
        diff -= pivot * (user_pref[factor] * restaurant_pref[factor]) / 25
    return scale_rating(
        avg_rating +
        scale *
        diff *
        math.log10(review_cnt_truncated) /
        math.log10(MAX_REVIEW_COUNT))
