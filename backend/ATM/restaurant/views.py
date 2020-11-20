
from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse,HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import Article,Comment
from django.core.exceptions import ObjectDoesNotExist
from .models import Restaurant, openTime, menu, ThumbNail, keyword, Review, PreferenceVector


#preferencVector
def searched_restaurants(request,word):
    if request.method == 'GET':
        if request.user.is_authenticated == False:
            return HttpResponse(status = 401)
  
        if word == '':
            response_list = []
            for restaurant in Restaurant.objects.all().values():
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['foodCategory'] = restaurant.foodCategory
                response_dict['rate'] = 3.5
                thumbnail = 
                    ThumbNail.objects.get(restaurant_name=restaurant.name).select_related('restaurant')
                response_dict['thumbNail'] = thumbnail.url
                preferenceVector = get_attributes(restaurant.preferenceVector)
                response_dict['preferenceVector'] = preferenceVector
                response_list.append(response_dict)
                return JsonResponse(response_list, safe=False, status = 200)
        else:
            response_list = []
            for restaurant in Restaurant.objects.filter(name__contains=word):
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                foodCategory = get_attributes(restaurant.foodCategory)
                response_dict['foodCategory'] = get_foodCategory(foodCategory)
                response_dict['rate'] = 3.5
                thumbnail=
                    ThumbNail.objects.get(restaurant_name=restaurant.name).select_related('restaurant')
                response_dict['ThumbNail'] = thumbnail.url
                preferenceVector = get_attributes(restaurant.preferenceVector)
                response_dict['preferenceVector'] = preferenceVector
                response_list.append(response_dict)
                return JsonResponse(response_list, safe= False, status = 200)
    else :
        return HttpResponseNotAllowed(['GET'])


def restaurant(request,id) :
    if request.method == 'GET':
        if request.user.is_authenticated == False:
            return HttpResponse(status = 401)
    
        try:
            restaurant = Restaurant.objects.get(id = id).values()
        except Restaurant.DoesNotExist:
            return HttpResponse(status = 404)
        else:
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['title'] = restaurant.name
            response_dict['foodCategory'] = restaurant.foodCategory
            response_dict['rate'] = 3.5
            response_dict['difference'] = 3.5 - restaurant.avgRating
            thumbnail_list = []
            for thumbnail in ThumbNail.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                thumbnail_list.append(thumbnail.url)
            response_dict['thumbNail'] = thumbnail_list
            menu_list = []
            for price in menu.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                menu_list.append({price.name : price.price})
            response_dict['menu'] = menu_list
            openTime_list = []
            for time in openTime.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                openTime_list.append({time.condition : time.time})
            response_dict['openTime'] = openTime_list
            keyword_list = []
            for key in keyword.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                keyword_list.append({key.word : key.weight})
            response_dict['keywords'] = keyword_list
            response_dict['urls'] = [restaurant.kakaoLink, restaurant.naverLink]
            return JsonResponse(response_dict, status = 200)                
    else :
        return HttpResponseBadRequest(['GET'])




def get_attributes(object):
    no_need_attr = ['_state', 'id']
    attr_list = list(object.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr_list not in no_need_attr:
            new_attr_list.push(attr)
    return new_attr_list


