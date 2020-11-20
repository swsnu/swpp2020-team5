from django.shortcuts import render
from json import JSONDecodeError
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import PreferenceVector
from .util import cos_sim_word
from .user.util import get_preference_attributes

# Create your views here.
def index():
    return

def sign_up(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['name']
            email = req_data['email']
            password = req_data['password']
            selected_foods = req_data['selectedFoods']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        # This checks duplicated user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
        except:
            return HttpResponse(status=409)
        pref_vec = PreferenceVector()
        attr_list = get_preference_attributes(pref_vec)
        true_food_list = filter(lambda food_bool: food_bool[1], selected_foods.items())
        true_food_list = map(lambda food_bool: food_bool[0], true_food_list)
        for attr in attr_list:
            weight = 0.0
            for food in true_food_list:
                weight += cos_sim_word(attr, food)
            pref_vec[attr] = weight
        pref_vec.save()
        user.profile.preference_vector = pref_vec
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def sign_in(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        user = authenticate(request, email=email, password=password)
        if user is None:
            return HttpResponse(status=401)
        else:
            login(request, user)
            return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['POST'])

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



