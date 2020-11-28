from django.shortcuts import render
from json import JSONDecodeError
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import PreferenceVector, FoodCategory, Location, Profile
from .utils import cos_sim_word
from .user.utils import get_preference_attributes
import json
import requests
# Create your views here.
def index():
    return


@ensure_csrf_cookie
def sign_up(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            email = req_data['email']
            password = req_data['password']
            selected_foods = req_data['selectedFoods']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        # This checks duplicated user
        if User.objects.filter(email=email).exists() or \
           User.objects.filter(username=username).exists():
            return HttpResponse(status=409)

        ## By user's selected foods, initialize pref_vec
        pref_vec = PreferenceVector()
#        attr_list = get_preference_attributes(pref_vec)
#        true_food_list = filter(lambda food_bool: food_bool[1], selected_foods.items())
#        true_food_list = map(lambda food_bool: food_bool[0], true_food_list)
#        for attr in attr_list:
#            weight = 0.0
#            for food in true_food_list:
#                weight += cos_sim_word(attr, food)
#            pref_vec[attr] = weight
#        pref_vec.save()

        food_category = FoodCategory()
        food_category.save()

        search_location = Location()
        search_location.save()

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        profile = Profile(user=user,
                          #preference_vector=pref_vec,
                          food_category=food_category,
                          search_location=search_location)
        profile.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def sign_in(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            username = User.objects.get(email=email).username
            password = req_data['password']
            loc_x = req_data['currLoc']['x']
            loc_y = req_data['currLoc']['y']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        user = authenticate(request, username=username, password=password)
        if user is None:
            return HttpResponse(status=401)
        else:
            login(request, user)
            url = f'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x={loc_x}&y={loc_y}'
            headers = {"Authorization": "KakaoAK aac06354b765df501b09c92813259058"}
            api_test = requests.get(url,headers=headers)
            url_text = json.loads(api_test.text)
            address_name = url_text['documents'][0]['address_name']
            #user = request.user.profile
            user.search_location.x = loc_x
            user.search_location.y = loc_y
            user.search_location.address_name = address_name
            user.search_location.save()
            return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def sign_out(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])
