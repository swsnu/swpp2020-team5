import json
from datetime import datetime
from django.test import TestCase, Client
from django.contrib.auth.models import User
from ATM.models import Review, Restaurant, Profile, Location, PreferenceVector


class ReviewTestCase(TestCase):
    def setUp(self):

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
        profileA = Profile(user=userA)
        profileA.save()
        profileB = Profile(user=userB)
        profileB.save()

        mock_location = Location(x=0, y=0, address_name='')
        mock_location.save()
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
        restaurantA = Restaurant(
            name='restaurantA',
            location=mock_location,
            avg_rating=4,
            preference_vector=mock_prevec,
            food_category='',
            naver_link='',
            kakao_link='')
        restaurantA.save()

        restaurantB = Restaurant(
            name='restaurantB',
            location=mock_location,
            avg_rating=4,
            preference_vector=mock_prevec,
            food_category='',
            naver_link='',
            kakao_link='')
        restaurantB.save()

        review = Review(
            restaurant=restaurantA,
            author=profileA,
            content='A wrote this',
            rating=3,
            date=datetime.now(),
            site='atm')
        review.save()
        review = Review(
            restaurant=restaurantA,
            author=profileB,
            content='B wrote this',
            rating=5,
            date=datetime.now(),
            site='atm')
        review.save()

    def test_count(self):
        self.assertEqual(Review.objects.all().count(), 2)
        self.assertEqual(Restaurant.objects.all().count(), 2)
        restaurant = Restaurant.objects.get(id=1)
        self.assertEqual(restaurant.id, 1)

    def test_get_other_reviews(self):
        client = Client()

        ### Without login case ###
        response = client.get('/atm/restaurant/1/other-review/')
        self.assertEqual(response.status_code, 401)

        ### Login successfully ###
        response = client.post('/atm/sign-in/',
                               json.dumps({'email': 'testerA@tester.com',
                                           'password': '123123',
                                           'x': '',
                                           'y': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        ### Not allowed request ###
        response = client.post('/atm/restaurant/1/other-review/')
        self.assertEqual(response.status_code, 405)
        response = client.put('/atm/restaurant/1/other-review/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/atm/restaurant/1/other-review/')
        self.assertEqual(response.status_code, 405)

        # GET OTHER REVIEW

        # The ideal case
        response = client.get('/atm/restaurant/1/other-review/')
        self.assertEqual(response.status_code, 200)

        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/75/other-review/')
        self.assertEqual(response.status_code, 404)

    def test_get_post_my_review(self):
        client = Client()

        ### Without login case ###
        response = client.get('/atm/restaurant/1/my-review/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/atm/restaurant/1/my-review/')
        self.assertEqual(response.status_code, 401)

        ### Login successfully ###
        response = client.post('/atm/sign-in/',
                               json.dumps({'email': 'testerA@tester.com',
                                           'password': '123123',
                                           'x': '',
                                           'y': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        ### Not allowed request ###
        response = client.put('/atm/restaurant/1/my-review/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/atm/restaurant/1/my-review/')
        self.assertEqual(response.status_code, 405)

        ### GET MY REVIEW ###
        # The ideal case
        response = client.get('/atm/restaurant/1/my-review/')
        self.assertEqual(response.status_code, 200)

        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/75/my-review/')
        self.assertEqual(response.status_code, 404)

        ### PORST MY REVIEW ###

        # The ideal case
        response = client.post('/atm/restaurant/1/my-review/',
                               json.dumps({'content': 'posted successfully',
                                           'rating': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # Restaurant doesn't exist
        response = client.post('/atm/restaurant/75/my-review/',
                               json.dumps({'content': 'no restaurant',
                                           'rating': 4}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # Wrong data (Bad request)
        response = client.post('/atm/restaurant/75/my-review/',
                               json.dumps({'WRONG_CONTENT': 'no restaurant',
                                           'rating': 4}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_edit_my_review(self):
        client = Client()

        ### Without login case ###
        response = client.get('/atm/my-review/1/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/atm/my-review/1/')
        self.assertEqual(response.status_code, 401)

        ### Login successfully ###
        response = client.post('/atm/sign-in/',
                               json.dumps({'email': 'testerA@tester.com',
                                           'password': '123123',
                                           'x': '',
                                           'y': ''}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        ### Not allowed request ###
        response = client.get('/atm/my-review/1/')
        self.assertEqual(response.status_code, 405)
        response = client.post('/atm/my-review/1/')
        self.assertEqual(response.status_code, 405)

        ### PUT MY REVIEW ###

        # The Ideal case
        response = client.put('/atm/my-review/1/',
                              json.dumps({'content': 'changed',
                                          'rating': 3}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # Review doesn't exist
        response = client.put('/atm/my-review/754/',
                              json.dumps({'content': 'no review',
                                          'rating': 2}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # Not my review (Forbidden request)
        response = client.put('/atm/my-review/2/',
                              json.dumps({'content': 'changed',
                                          'rating': 3}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 403)

        # Wrong data (Bad request)
        response = client.put('/atm/my-review/1/',
                              json.dumps({'WRONG_content': 'changed',
                                          'rating': 3}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        ### DELETE MY REIVEW ###

        # The Ideal case ##
        response = client.delete('/atm/my-review/1/')
        self.assertEqual(response.status_code, 200)

        # Review doesn't exist
        response = client.delete('/atm/my-review/754/')
        self.assertEqual(response.status_code, 404)

        # Not my review (Forbidden request)
        response = client.delete('/atm/my-review/2/')
        self.assertEqual(response.status_code, 403)
