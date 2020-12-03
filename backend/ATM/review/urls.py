from django.urls import path

from . import views

urlpatterns = [
    path(
        'restaurant/<int:restaurant_id>/my-review/',
        views.get_post_my_review,
        name='my_review'),
    path(
        'restaurant/<int:restaurant_id>/other-review/',
        views.get_other_reviews,
        name='other-review'),
    path(
        'my-review/<int:review_id>/',
        views.edit_my_review,
        name='edit-my-review'),
]
