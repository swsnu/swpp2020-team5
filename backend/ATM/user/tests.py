from django.test import TestCase, Client
from django.contrib.auth.models import User
from .utils import get_preference_attributes


class UserTestCase(TestCase):
    def setUp(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        request_body = {
            "username": "sug",
            "email": 'sug@sug.com',
            'password': 'sug',
            'selectedFoods': ['짜장면'],
        }
        response = client.post('/atm/sign-up/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(201, response.status_code)

    def test_me(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/user/me/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/user/me/')
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'sug@sug.com',
            'password': 'sug',
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/user/me/')
        self.assertEqual(200, response.status_code)

    def test_pref_vec(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/user/preference-vector/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/user/preference-vector/')
        self.assertEqual(401, response.status_code)
        response = client.put('/atm/user/preference-vector/',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'sug@sug.com',
            'password': 'sug',
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/user/preference-vector/')
        self.assertEqual(200, response.status_code)

        vec = {}
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/user/preference-vector/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(400, response.status_code)

        user = User.objects.all()[0]
        attr_list = get_preference_attributes(user.profile.preference_vector)
        for attr in attr_list:
            vec[attr] = 1
        response = client.put('/atm/user/preference-vector/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(200, response.status_code)

    def test_search_location(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/user/search-location/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/user/search-location/')
        self.assertEqual(401, response.status_code)
        response = client.put('/atm/user/search-location/',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'sug@sug.com',
            'password': 'sug',
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/user/search-location/')
        self.assertEqual(200, response.status_code)

        vec = {}
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/user/search-location/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(400, response.status_code)

        user = User.objects.all()[0]
        attr_list = get_preference_attributes(user.profile.search_location)
        for attr in attr_list:
            vec[attr] = 1
        response = client.put('/atm/user/search-location/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(200, response.status_code)

    def test_food_category(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/user/food-category/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/user/food-category/')
        self.assertEqual(401, response.status_code)
        response = client.put('/atm/user/food-category/',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'sug@sug.com',
            'password': 'sug',
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/user/food-category/')
        self.assertEqual(200, response.status_code)

        vec = {}
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/user/food-category/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(400, response.status_code)

        user = User.objects.all()[0]
        attr_list = get_preference_attributes(user.profile.food_category)
        for attr in attr_list:
            vec[attr] = 1
        response = client.put('/atm/user/food-category/',
                              vec,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(200, response.status_code)

    def test_check(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/user/me/',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/user/me/')
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'sug@sug.com',
            'password': 'sug',
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get(
            '/atm/user/check/?username=sug&email=sug@sug.com')
        self.assertEqual(401, response.status_code)
        response = client.get('/atm/user/check/?username=sug&email=wrong')
        self.assertEqual(401, response.status_code)
        response = client.get(
            '/atm/user/check/?username=wrong&email=sug@sug.com')
        self.assertEqual(401, response.status_code)
        response = client.get('/atm/user/check/?username=wrong&email=wrong')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post(
            '/atm/user/check/?username=wrong&email=wrong',
            {},
            HTTP_X_CSRFTOKEN=csrftoken,
            content_type='application/json')
        self.assertEqual(405, response.status_code)
