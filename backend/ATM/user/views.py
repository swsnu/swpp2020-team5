from django.shortcuts import render
from json import JSONDecodeError
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie


def my_name(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response_dict = {
                'name': request.user.username,
            }
            return JsonResponse(response_dict,status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

def preference_vector():
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            pref_vec = user.preference_vector
            attr_list = get_attributes(pref_vec)
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = pref_vec[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user.profile
            old_pref_vec = user.preference_vector
            attr_list = get_attributes(old_pref_vec)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.preference_vector[attr] = req_data[attr]
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            user.preference_vector.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.preference_vector[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET','PUT'])

def search_location():
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            search_location = user.search_location
            attr_list = get_attributes(search_location)
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = search_location[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user.profile
            search_location = user.search_location
            attr_list = get_attributes(search_location)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.search_location[attr] = req_data[attr]
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            user.search_location.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.search_location[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET','PUT'])

def food_category():
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            food_category = user.food_category
            attr_list = get_attributes(food_category)
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = food_category[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user.profile
            food_category = user.food_category
            attr_list = get_attributes(food_category)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.food_category[attr] = req_data[attr]
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            user.food_category.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.food_category[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET','PUT'])n

def get_attributes(object):
    no_need_attr = ['_state', 'id']
    attr_list = list(object.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr_list not in no_need_attr:
            new_attr_list.push(attr)
    return new_attr_list
