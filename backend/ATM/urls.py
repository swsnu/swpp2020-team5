from django.urls import path, include

from . import views

urlpatterns = [
    path('sign-up/', views.sign_up, name='sign_up'),
    path('sign-in/', views.sign_in, name='sign_in'),
    path('sign-out/', views.sign_out, name='sign_out'),
    path('user/', include('ATM.user.urls')),
    path('token/', views.token, name='token'),
]
