from django.urls import path

from . import views

urlpatterns = [

    path('restaurant/<int:restaurant_id>/my-review', views.my_review, name = 'my_review'),
    path('restaurant/<int:restaurant_id>/other-review/', views.get_other_reviews, name='other-review'),
    path('myreview/', views.post_my_review, name='post-my-review'),
    path('myreview/<int:review_id>/', views.edit_my_review, name='edit-my-review'),

]
