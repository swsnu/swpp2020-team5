
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from ..models import Restaurant, openTime, menu, ThumbNail, keyword, Review, PreferenceVector, Profile, Location
from haversine import haversine

# preferencVector


def main_restaurants(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            author = Profile.objects.get(user=request.user)
            response_list = []
            for restaurant in Restaurant.objects.all():

                cur = (author.search_location.y, author.search_location.x)
                res_loc = (restaurant.location.y, restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                response_dict['rate'] = 3.5
                thumbnail = ThumbNail.objects.select_related(
                    'restaurant').get(restaurant=restaurant)
                response_dict['img_url'] = thumbnail.url
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                response_dict['preferenceVector'] = restaurant_pref_dict
                response_list.append(response_dict)
            return JsonResponse(response_list, safe=False, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def searched_restaurants(request, word):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        else:
            author = Profile.objects.get(user=request.user)
            response_list = []
            for restaurant in Restaurant.objects.filter(name__contains=word):
                cur = (author.search_location.y, author.search_location.x)
                res_loc = (restaurant.location.y, restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                response_dict['rate'] = 3.5
                thumbnail = ThumbNail.objects.select_related(
                    'restaurant').get(restaurant=restaurant)
                response_dict['img_url'] = thumbnail.url

                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                response_dict['preferenceVector'] = restaurant_pref_dict
                response_list.append(response_dict)

            return JsonResponse(response_list, safe=False, status=200)

    else:
        return HttpResponseNotAllowed(['GET'])


def restaurant(request, id):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)

        try:
            restaurant = Restaurant.objects.get(id=id)
        except Restaurant.DoesNotExist:
            return HttpResponse(status=404)
        else:
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.food_category
            response_dict['rate'] = 3.5
            response_dict['difference'] = 3.5 - restaurant.avg_rating
            thumbnail_list = []
            for thumbnail in ThumbNail.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                thumbnail_list.append(thumbnail.url)
            response_dict['img_url'] = thumbnail_list[0]
            response_dict['img_url_list'] = thumbnail_list
            menu_list = []
            for price in menu.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                menu_list.append({price.name: price.price})
            response_dict['menu'] = menu_list
            openTime_list = []
            for time in openTime.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                openTime_list.append({time.condition: time.time})
            response_dict['time'] = openTime_list
            keyword_list = []
            for key in keyword.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                keyword_list.append({key.word: key.weight})
            response_dict['keywords'] = keyword_list
            response_dict['urls'] = [
                restaurant.kakao_link,
                restaurant.naver_link]
            response_dict['location'] = restaurant.location.address_name
            return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def get_preference_attributes(pref_vec):
    no_need_attr = ['_state', 'id']
    attr_list = list(pref_vec.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr not in no_need_attr:
            new_attr_list.append(attr)
    return new_attr_list
