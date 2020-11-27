from django.urls import path
from . import views

urlpatterns = [
    path('restaurant/search/<str:word>', views.searched_restaurants, name = 'searched_restauratns'),
    path('restaurant/detail/<int:id>', views.restaurant, name = 'restaurant'),
]
