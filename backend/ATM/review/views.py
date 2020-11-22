from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json

from json import JSONDecodeError
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import Review, Restaurant, Profile
from datetime import datetime

@ensure_csrf_cookie
def get_other_reviews(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                target = Restaurant.objects.get(restaurant_id)
            except Restaurant.DoesNotExist:
                return JsonResponse({}, status=404)

            reviews_on_target = [review for review in Review.objects.all().values() if review.restaurant.id == restaurant_id]

            naver = [{'id': review.id, 'content': review.content, 'rating': review.rating, 'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'), 'author_name': review.author.name } for review in reviews_on_target if review.site == 'naver']
            kakao = [{'id': review.id, 'content': review.content, 'rating': review.rating, 'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'), 'author_name': review.author.name } for review in reviews_on_target if review.site == 'kakao']
            atm = [{'id': review.id, 'content': review.content, 'rating': review.rating, 'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'), 'author_name': review.author.name } for review in reviews_on_target if review.site == 'atm']

            other_review_list = {'naver': naver, 'kakao': kakao, 'atm': atm}
            return JsonResponse(other_review_list, safe=False)  ## default status is 200
        else:
            return HttpResponseNotAllowed(['GET'])
    else:
        return HttpResponse(status=401)


@ensure_csrf_cookie
def post_my_review(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'POST':
            try:
                req_data = json.loads(request.body.decode())
                content = req_data['content']
                rating = req_data['rating']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponseBadRequest()
             
            date = datetime.now()
            restaurant = Restaurant.objects.get(id=restaurant_id)
            author = Profile.objects.get(user=request.user)

            new_review = Review(restaurant, author, content, rating, date, 'atm') 
            new_review.save()
            response_dict = {'id': new_review.id, 'content': new_review.content, 'rating': new_review.rating, 'date': new_review.date.strftime('%Y/%m/%d, %H:%M:%S')}

            return HttpResponse(content=json.dumps(response_dict), status=201)  ## default status is 200
        else:
            return HttpResponseNotAllowed(['POST'])
    else:
        return HttpResponse(status=401)


@ensure_csrf_cookie
def edit_my_review(request, review_id):
    if request.user.is_authenticated:
        if request.method == 'PUT':
            try:
                target_review = Review.objects.get(id=review_id)
            except Review.DoesNotExist:
                return HttpResponseNotFound('<h1>Page not found</h1>')
            
            if request.user.email != target_review.author.user.email:
                return HttpResponseForbidden()

            try:
                req_data = json.loads(request.body.decode())
                content = req_data['content']
                rating = req_data['rating']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponseBadRequest()

            target_review.content = content
            target_review.rating = rating
            target_review.date = datetime.now()
            target_review.save()

            response_dict = {'id': target_review.id, 'content': target_review.content, 'rating': target_review.rating, 'date': target_review.date.strftime('%Y/%m/%d, %H:%M:%S')}
            return HttpResponse(content=json.dumps(response_dict), status=200)  ## default status is 200
        
        elif request.method == 'DELETE':
            try:
                target_review = Review.objects.get(id=review_id)
            except Review.DoesNotExist:
                return HttpResponseNotFound('<h1>Page not Found</h1>')
            
            if request.user.email != target_review.author.user.email:
                return HttpResponseForbidden()

            response_dict = {'id': target_review.id}
            target_review.delete()

            return HttpResponse(content=json.dumps(response_dict), status=200)  ## default status is 200
        else:
            return HttpResponseNotAllowed(['PUT','DELETE'])
    else:
        return HttpResponse(status=401)
