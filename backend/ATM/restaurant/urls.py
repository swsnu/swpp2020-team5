'''
restaurant urls
'''
from django.urls import path
from ATM.restaurant import views

urlpatterns = [
    path(
        'search/',
        views.searched_restaurants,
        name='searched_restaurants'),
    path(
        'search/<str:word>',
        views.searched_restaurants,
        name='searched_restaurants'),
    path(
        'detail/<int:restaurant_id>',
        views.restaurant_detail,
        name='restaurant'),
]
