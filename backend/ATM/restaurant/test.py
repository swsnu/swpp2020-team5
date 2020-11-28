from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.contrib.auth import login
from ..models import *
from haversine import haversine
import json


class RestaurantTestCase(TestCase):
    def setUp(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        User.objects.create_user(
            username='testerA',
            password='123123',
            email='testerA@tester.com')
        User.objects.create_user(
            username='testerB',
            password='123123',
            email='testerB@tester.com')
        userA = User.objects.get(username='testerA')
        userB = User.objects.get(username='testerB')
        # location
        mock_Location_A = Location(x=0, y=0, address_name='d')
        mock_Location_A.save()
        mock_Location_B = Location(x=127, y=39, address_name='dd')
        mock_Location_B.save()
        # preferenceVector
        mock_prevec = PreferenceVector(
            매운=0,
            느끼한=0,
            짭짤한=0,
            달달한=0,
            기름진=0,
            고소한=0,
            싱거운=0,
            신맛이나는=0,
            담백한=0,
            바삭바삭한=0,
            부드러운=0,
            저렴한=0,
            푸짐한=0,
            웨이팅이있는=0,
            혼밥하기좋은=0)
        mock_prevec.save()
        # restaurant
        mock_restaurant_A = Restaurant(
            food_category='한식',
            preference_vector=mock_prevec,
            name='sa',
            location=mock_Location_A,
            avg_rating=3.3,
            kakao_link='www.naver.com',
            naver_link='www.naver.com',
            map_link='www.naver.com')
        mock_restaurant_A.save()
        mock_restaurant_B = Restaurant(food_category='한식',
                                       preference_vector=mock_prevec,
                                       name='adj',
                                       location=mock_Location_B,
                                       avg_rating=3.3,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com')
        mock_restaurant_B.save()

        mock_restaurant_C = Restaurant(food_category='한식',
                                       preference_vector=mock_prevec,
                                       name='sss',
                                       location=mock_Location_B,
                                       avg_rating=3.3,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com')
        mock_restaurant_C.save()
        # Profie
        mock_Profile_A = Profile(user=userA,
                                 search_location=mock_Location_A)
        mock_Profile_A.save()
        # menu
        mock_menu_A = menu(name='짜장면', price=300, restaurant=mock_restaurant_A)
        mock_menu_A.save()
        mock_menu_B = menu(name='dd', price=30, restaurant=mock_restaurant_B)
        mock_menu_B.save()
        # openTime
        mock_time_A = openTime(
            restaurant=mock_restaurant_A,
            condition='휴무',
            time='9:00')
        mock_time_A.save()
        mock_time_B = openTime(
            restaurant=mock_restaurant_B,
            condition='휴무',
            time='9:00')
        mock_time_B.save()
        # ThumbNail
        mock_ThumbNail_A = ThumbNail(
            restaurant=mock_restaurant_A,
            url='www.naver.com')
        mock_ThumbNail_A.save()

        mock_ThumbNail_B = ThumbNail(
            restaurant=mock_restaurant_B,
            url='www.naver.com')
        mock_ThumbNail_B.save()
        # keyword
        mock_keyword_A = keyword(
            restaurant=mock_restaurant_A, word='짠', weight=30)
        mock_keyword_A.save()
        mock_keyword_B = keyword(
            restaurant=mock_restaurant_B, word='짠', weight=30)
        mock_keyword_B.save()

    def test_main_restaurant(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/restaurant/search/',
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/restaurant/search/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'testerA@tester.com',
            'password': '123123'
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/search/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)

    def test_searched_restaurant(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/restaurant/search/s',
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/restaurant/search/sa',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'testerA@tester.com',
            'password': '123123'
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/search/s',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/restaurant/search/aaa',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/restaurant/search/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)

    def test_restaurant(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/restaurant/detail/1',
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/restaurant/detail/1',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'testerA@tester.com',
            'password': '123123'
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/detail/1',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/restaurant/detail/5',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(404, response.status_code)
