import json
from datetime import datetime
from json import JSONDecodeError
from django.http import (
        HttpResponse, HttpResponseNotAllowed, JsonResponse,
        HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
        )
from django.views.decorators.csrf import ensure_csrf_cookie
from ATM.models import Review, Restaurant, Profile
from .utils import prefvec_update

@ensure_csrf_cookie
def get_other_reviews(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                target = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return JsonResponse({}, status=404)

            reviews_on_target = Review.objects.filter(restaurant=target)

            naver = [
                    {
                        'id': review.id, 
                        'content': review.content, 
                        'rating': review.rating, 
                        'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'), 
                        'author_name': review.author.user.username
                        }
                for review in reviews_on_target if review.site == 'naver']
            kakao = [
                    {
                        'id': review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'),
                        'author_name': review.author.user.username
                        }
                for review in reviews_on_target if review.site == 'kakao']
            atm = [
                    {
                        'id': review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d, %H:%M:%S'),
                        'author_name': review.author.user.username
                        }
                for review in reviews_on_target if review.site == 'atm']

            other_review_list = {'naver': naver, 'kakao': kakao, 'atm': atm}
            other_review_list = {}
            return JsonResponse(
                other_review_list,
                safe=False)  # default status is 200
        else:
            return HttpResponseNotAllowed(['GET'])
    else:
        return HttpResponse(status=401)


@ensure_csrf_cookie
def get_post_my_review(request, restaurant_id):
    if request.user.is_authenticated:
        if request.method == 'GET':
            try:
                restaurant = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)
            response_list = [
                    {
                        'id':review.id,
                        'content': review.content,
                        'rating': review.rating,
                        'date': review.date.strftime('%Y/%m/%d, %H:%M:%S')
                        }
                    for review in Review.objects.all()
                    if request.user.email == review.author.user.email]
            return HttpResponse(response_list, status=200) 
        elif request.method == 'POST':
            try:
                req_data = json.loads(request.body.decode())
                content = req_data['content']
                rating = float(req_data['rating'])
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
            try:
                restaurant = Restaurant.objects.get(id=restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status=404)
            date = datetime.now()
            author = Profile.objects.get(user=request.user)
            new_review = Review(
                    restaurant=restaurant, 
                    author=author, 
                    content=content, 
                    rating=rating, 
                    date=date, 
                    site='atm') 
            new_review.save()
            response_dict = {
                'id': new_review.id,
                'content': new_review.content,
                'rating': new_review.rating,
                'date': new_review.date.strftime('%Y/%m/%d, %H:%M:%S')}
            restaurant_prefvec = restaurant.preference_vector
            user_prefvec = author.preference_vector
            avg_diff = (rating - restaurant.avg_rating) / 5.0
            prefvec_update(restaurant_prefvec, user_prefvec, avg_diff)

            return HttpResponse(
                content=json.dumps(response_dict),
                status=201)  # default status is 200
        else:
            return HttpResponseNotAllowed(['GET', 'POST'])
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
            except (KeyError, JSONDecodeError):
                return HttpResponseBadRequest()
            target_review.content = content
            target_review.rating = rating
            target_review.date = datetime.now()
            target_review.save()
            response_dict = {
                'id': target_review.id,
                'content': target_review.content,
                'rating': target_review.rating,
                'date': target_review.date.strftime('%Y/%m/%d, %H:%M:%S')
                }
            return HttpResponse(
                content=json.dumps(response_dict),
                status=200)  # default status is 200
        elif request.method == 'DELETE':
            try:
                target_review = Review.objects.get(id=review_id)
            except Review.DoesNotExist:
                return HttpResponseNotFound('<h1>Page not Found</h1>')
            if request.user.email != target_review.author.user.email:
                return HttpResponseForbidden()
            response_dict = {'id': target_review.id}
            target_review.delete()
            return HttpResponse(
                content=json.dumps(response_dict),
                status=200)  # default status is 200
        else:
            return HttpResponseNotAllowed(['PUT', 'DELETE'])
    else:
        return HttpResponse(status=401)
