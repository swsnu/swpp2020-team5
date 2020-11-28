from django.urls import path
from . import views

urlpatterns = [
    path(
        'search/',
        views.main_restaurants,
        name='searched_restaurants'),
    path(
        'search/<str:word>',
        views.searched_restaurants,
        name='searched_restauratns'),
    path(
        'detail/<int:id>',
        views.restaurant,
        name='restaurant'),
]
