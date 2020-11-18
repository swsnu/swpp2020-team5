from django.urls import path
from ATM import views

urlpatterns = [
    path('restaurant/search/<str:word>', views.searched_restaurants, name = 'searched-restauratns'),
    path('restaurant/detail/<int:id>'), views.restaurant, name = 'restaurant'),
    


]