from django.test import TestCase, Client
from django.contrib.auth.models import User

# Create your tests here.


class HomeTestCase(TestCase):
    def test_token(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/atm/token/', {},
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
        response = client.get('/atm/token/')
        self.assertEqual(204, response.status_code)

    def test_sign_up(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/sign-up/')
        self.assertEqual(405, response.status_code)

        request_body = {
            "BADname": "sug",
            "email": "sug@sug.com",
            "password": "sug",
            "selectedFoods": ["짜장면"]
        }
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/sign-up/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(400, response.status_code)
        request_body = {
            "username": "sug",
            "email": "sug@sug.com",
            "password": "sug",
            "selectedFoods": ["짜장면"]
        }
        response = client.post('/atm/sign-up/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(201, response.status_code)

        response = client.post('/atm/sign-up/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(409, response.status_code)

    def test_sign_in(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/sign-in/')
        self.assertEqual(405, response.status_code)

        request_body = {
            "email": "sug@sug.com",
            "password": "sug",
            "currLoc": {
                'x': 1,
                'y': 2,
            }
        }
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/sign-in/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": "sug@sug.com",
            "WRONGpassword": "sug",
            "currLoc": {
                'x': 1,
                'y': 2,
            }
        }
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/sign-in/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(400, response.status_code)
        request_body = {
            "username": "sug",
            "email": "sug@sug.com",
            "password": "sug",
            "selectedFoods": ["짜장면"]
        }
        response = client.post('/atm/sign-up/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(201, response.status_code)

        # Wrong password

        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        request_body = {
            "email": "sug@sug.com",
            "password": "wrong",
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)

        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        request_body = {
            "email": "sug@sug.com",
            "password": "sug",
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.post('/atm/sign-in/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(204, response.status_code)

    def test_sign_out(self):
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value

        request_body = {
            "username": "sug",
            "email": "sug@sug.com",
            "password": "sug",
            "selectedFoods": ["짜장면"]
        }
        response = client.post('/atm/sign-up/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(201, response.status_code)

        request_body = {
            "email": "sug@sug.com",
            "password": "sug",
            "currLoc": {
                'x': '126',
                'y': '37',
            }
        }
        response = client.get('/atm/sign-out/')
        self.assertEqual(401, response.status_code)
        response = client.post('/atm/sign-in/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(204, response.status_code)

        response = client.get('/atm/sign-out/')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/sign-out/', request_body,
                               content_type="application/json",
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(405, response.status_code)
