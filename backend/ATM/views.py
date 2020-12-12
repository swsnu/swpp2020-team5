import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
import requests
from .models import PreferenceVector, FoodCategory, Location, Profile, Author
from .utils import cos_sim_word
from .user.utils import get_preference_attributes

# Create your views here.
max_weight = 5.0
min_weight = 0


@ensure_csrf_cookie
def sign_up(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            email = req_data['email']
            password = req_data['password']
            selected_foods = req_data['selectedFoods']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        # This checks duplicated user
        if User.objects.filter(email=email).exists() or \
           User.objects.filter(username=username).exists():
            return HttpResponse(status=409)

        # By user's selected foods, initialize pref_vec
        pref_vec = PreferenceVector()
        attr_list = get_preference_attributes(pref_vec)
        max_cos = 0
        min_cos = 5.0
        for attr in attr_list:
            weight = 0.0
            for food in selected_foods:
                weight += (cos_sim_word(attr, food))
                if cos_sim_word(attr, food) > max_cos:
                    max_cos = cos_sim_word(attr, food)
                if cos_sim_word(attr, food) < min_cos:
                    min_cos = cos_sim_word(attr, food)
            weight = 2.5+10*weight
            """
            if weight > max_weight:
                weight = max_weight
            if weight < min_weight:
                weight = min_weight
            """
            pref_vec[attr] = weight
        pref_vec.save()
        """
        print('max', max_cos)
        print('min', min_cos)
        """
        food_category = FoodCategory()
        food_category.save()

        search_location = Location()
        search_location.save()

        user = User.objects.create_user(
            username=username, email=email, password=password)
        user.save()

        profile = Profile(user=user,
                          preference_vector=pref_vec,
                          food_category=food_category,
                          search_location=search_location)
        profile.save()

        author = Author(user=user,
                        nickname=username)

        author.save()

        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@ensure_csrf_cookie
def sign_in(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            loc_x = req_data['currLoc']['x']
            loc_y = req_data['currLoc']['y']
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return HttpResponse(status=401)
        if user.check_password(password):
            login(request, user)
            cur_user = Profile.objects.get(user=user)
            cur_user.search_location.x = loc_x
            cur_user.search_location.y = loc_y
            url = f'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x={loc_x}&y={loc_y}'
            headers = {"Authorization": "KakaoAK aac06354b765df501b09c92813259058"}
            api_test = requests.get(url,headers=headers)
            url_text = json.loads(api_test.text)
            address_name = url_text['documents'][0]['address_name']
            print(address_name)
            cur_user.search_location.address_name = address_name
            cur_user.search_location.save()

            for attr in get_preference_attributes(cur_user.food_category):
                cur_user.food_category[attr] = True
            cur_user.food_category.save()

            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
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
