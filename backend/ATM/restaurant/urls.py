from django.urls import path
from . import views

urlpatterns = [
    

    path('restaurant/search/<str:word>', views.searched_restaurants, name = 'searched-restauratns'),
    path('restaurant/detail/<int:id>', views.restaurant, name = 'restaurant'),
    path('restaurant/<int:id>/my-review', views.my_review, name = 'my-review'),

]
