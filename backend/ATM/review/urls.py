from django.urls import path

from . import views

urlpatterns = [
    path(
        'my-review/<int:review_id>/',
        views.edit_my_review,
        name='edit-my-review'),
]
