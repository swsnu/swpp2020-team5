
from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse,HttpResponseBadRequest
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import Article,Comment
from django.core.exceptions import ObjectDoesNotExist
from .models import Restaurant

# Create your views here.
#레스토랑에 커스터마이즈드 평점 계산해서 넣어줘야함
#리스폰스 바꾸기(포린키로 되어있을 경우 어떻게 나오는지 그리고 제이슨 )
#세션에 유저 정보있는지 확인하기
def searched_restaurants(request,word) :
    if request.User.is_authenticated == False :
        return HttpResponse(status = 401)
    if request.method == 'GET' :
        restaurantLists = [restaurant for restaurant in Restaurant.objects.all().values()]
        if word == '' :
            return JsonResponse(restaurantLists, safe = False, status = 200)
        else :
            def findstr(x) :
                if x.find(word) == -1 :
                    return False
                else :
                    return True
            searched_list = list(filter(findstr,restaurantLists))
            return JsonResponse(searched_list, safe = False, status = 200 )
    else :
        return HttpResponseNotAllowed(['GET'])

def restaurant(request,id) :
    if request.User.is_authenticated == False :
        return HttpResponse(status = 401)
    if request.method == 'GET':
        try :
            restaurant = Restaurant.objects.get(id = id).values()
        except Restaurant.DoesNotExist :
            restaurant = None
        if(restaurant == None) :
            return HttpResponse(status = 404)
        else :
            return JsonResponse(restaurant, safe = False, status = 200)
    else :
        return HttpResponseBadRequest(['GET'])
def 


    