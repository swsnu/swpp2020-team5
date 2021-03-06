from django.urls import path

from . import views

urlpatterns = [
    path(
        'me/',
        views.me_info,
        name='me'),
    path(
        'preference-vector/',
        views.preference_vector,
        name='preference_vector'),
    path(
        'search-location/',
        views.search_location,
        name='search_location'),
    path(
        'food-category/',
        views.food_category,
        name='food_category'),
    path(
        'current-tab/',
        views.current_tab,
        name='current_tab'),
    path(
        'check/',
        views.check,
        name='check'),
]
