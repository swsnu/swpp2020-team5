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
                'date': target_review.date.strftime('%Y/%m/%d')
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
