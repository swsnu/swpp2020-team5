from django.urls import path, include

from . import views

urlpatterns = [
    path('my-name/', views.my_name, name='my_name'),
    path('preference-vector/', views.preference_vector, name='preference_vector'),
    path('search-location/', views.search_location, name='search_location'),
    path('food-category/', views.food_category, name='food_category'),
]
