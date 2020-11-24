
from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse,HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import Article,Comment
from django.core.exceptions import ObjectDoesNotExist
from .models import Restaurant, openTime, menu, ThumbNail, keyword, Review, PreferenceVector, Profile, Location
from haversine import haversine

#preferencVector
def searched_restaurants(request,word):
    if request.method == 'GET':
        if request.user.is_authenticated == False:
            return HttpResponse(status = 401)
        author = Profile.objects.get(user=request.user)
        if word == '':
            response_list = []
            for restaurant in Restaurant.objects.all().values():
                
                cur = (author.y, author.x)
                res_loc = (restaurant.location.y,restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.foodCategory
                response_dict['rate'] = 3.5
                thumbnail = 
                    ThumbNail.objects.get(restaurant_name=restaurant.name).select_related('restaurant')
                response_dict['img_url'] = thumbnail.url
                preferenceVector = restaurant.preferenceVector
                preferenceList = []
                for factor in preferenceVector:
                    preferenceList.append({factor : preferenceVector[facotr]})
                response_dict['preferenceVector'] = preferenceList
                response_list.append(response_dict)
            return JsonResponse(response_list, safe=False, status = 200)
        else:
            response_list = []
            for restaurant in Restaurant.objects.filter(name__contains=word):
                cur = (author.y, author.x)
                res_loc = (restaurant.location.y,restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                foodCategoryList = []
                foodCategory = restaurant.foodCategory
                for category in foodCategory:
                    foodCategoryList.append({category : foodCategory[category]})
                response_dict['category'] = foodCategoryList
                response_dict['rate'] = 3.5
                thumbnail=
                    ThumbNail.objects.get(restaurant_name=restaurant.name).select_related('restaurant')
                response_dict['img_url'] = thumbnail.urls
                preferenceVector = restaurant.preferenceVector
                preferenceList = []
                for factor in preferenceVector:
                    preferenceList.append({factor : preferenceVector[facotr]})
                response_dict['preferenceVector'] = preferenceList
                response_list.append(response_dict)
            for food in menu.objects.filter(name__contains=word):
                restaurant = food.restaurant
                cur = (author.y, author.x)
                res_loc = (restaurant.location.y,restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                foodCategoryList = []
                foodCategory = restaurant.foodCategory
                for category in foodCategory:
                    foodCategoryList.append({category : foodCategory[category]})
                response_dict['category'] = foodCategoryList
                response_dict['rate'] = 3.5
                thumbnail=
                    ThumbNail.objects.get(restaurant_name=restaurant.name).select_related('restaurant')
                response_dict['img_url'] = thumbnail.urls
                preferenceVector = restaurant.preferenceVector
                preferenceList = []
                for factor in preferenceVector:
                    preferenceList.append({factor : preferenceVector[facotr]})
                response_dict['preferenceVector'] = preferenceList
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
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.foodCategory
            response_dict['rate'] = 3.5
            response_dict['difference'] = 3.5 - restaurant.avgRating
            thumbnail_list = []
            for thumbnail in ThumbNail.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                thumbnail_list.append(thumbnail.url)
            response_dict['img_url'] = thumbnail_list[0]
            response_dict['img_url_list'] = thumbnail_list
            menu_list = []
            for price in menu.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                menu_list.append({price.name : price.price})
            response_dict['menu'] = menu_list
            openTime_list = []
            for time in openTime.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                openTime_list.append({time.condition : time.time})
            response_dict['time'] = openTime_list
            keyword_list = []
            for key in keyword.objects.filter(restaurant_name=restaurant.name).select_related('restaurant'):
                keyword_list.append({key.word : key.weight})
            response_dict['keywords'] = keyword_list
            response_dict['urls'] = [restaurant.kakaoLink, restaurant.naverLink]
            response_dict['location'] = restaurant.location.address_name
            return JsonResponse(response_dict, status = 200)                
    else :
        return HttpResponseBadRequest(['GET'])





