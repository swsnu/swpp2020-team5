import json
from json import JSONDecodeError
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import Q
from django.contrib.auth.models import User
from .utils import get_preference_attributes


@ensure_csrf_cookie
def me_info(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            response_dict = {
                'id': request.user.id,
                'name': request.user.username,
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def check(request):
    if request.method == 'GET':
        username = request.GET.get('username', '')
        email = request.GET.get('email', '')
        try:
            User.objects.get(Q(username=username) | Q(email__contains=email))
        except User.DoesNotExist:
            return HttpResponse(status=204)
        return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def preference_vector(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            pref_vec = user.preference_vector
            attr_list = get_preference_attributes(pref_vec)
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
            attr_list = get_preference_attributes(old_pref_vec)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.preference_vector[attr] = req_data[attr]
            except (KeyError, JSONDecodeError):
                return HttpResponse(status=400)
            user.preference_vector.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.preference_vector[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


@ensure_csrf_cookie
def search_location(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            search_loc = user.search_location
            attr_list = get_preference_attributes(search_loc)
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = search_loc[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user.profile
            search_loc = user.search_location
            attr_list = get_preference_attributes(search_loc)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.search_location[attr] = req_data[attr]
            except (KeyError, JSONDecodeError):
                return HttpResponse(status=400)
            user.search_location.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.search_location[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


@ensure_csrf_cookie
def food_category(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            user = request.user.profile
            food_cat = user.food_category
            attr_list = get_preference_attributes(food_cat)
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = food_cat[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user.profile
            food_cat = user.food_category
            attr_list = get_preference_attributes(food_cat)
            try:
                req_data = json.loads(request.body.decode())
                for attr in attr_list:
                    user.food_category[attr] = req_data[attr]
            except (KeyError, JSONDecodeError):
                return HttpResponse(status=400)
            user.food_category.save()
            response_dict = {}
            for attr in attr_list:
                response_dict[attr] = user.food_category[attr]
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])
