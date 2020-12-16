import json
from datetime import datetime
from django.test import TestCase, Client
from django.contrib.auth.models import User
from ATM.models import Review, Restaurant, Profile, Location, PreferenceVector, Author, FoodCategory


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
        authorA = Author(user=userA, nickname='userA')
        authorA.save()
        authorB = Author(user=userB, nickname='userB')
        authorB.save()

        mock_location = Location(x=127, y=36, address_name='mock_address')
        mock_location.save()
        mock_prevec = PreferenceVector(
            매운=0,
            느끼한=0,
            짭짤한=0,
            달달한=0,
            고소한=0,
            바삭바삭한=0,
            부드러운=0,
            저렴한=0,
            웨이팅이있는=0,
            혼밥하기좋은=0,
            불친절한=0)
        mock_prevec.save()
        food_category = FoodCategory(
            한식=True,
            일식=True,
            중식=False,
            양식=True,
            분식=True,
            술집=True,
            카페=True,
            치킨=True,
            간식=True,
            퓨전요리=True,
            아시아음식=True,
            패스트푸드=True
        )
        food_category.save()

        profileA = Profile(
            user=userA,
            search_location=mock_location,
            food_category=food_category,
            preference_vector=mock_prevec)
        profileA.save()
        profileB = Profile(
            user=userB,
            search_location=mock_location,
            food_category=food_category,
            preference_vector=mock_prevec)
        profileB.save()

        restaurantA = Restaurant(
            name='restaurantA',
            location=mock_location,
            avg_rating=4,
            preference_vector=mock_prevec,
            food_category='',
            menu='',
            openTime='',
            thumbnail='',
            keyword='',
            kakao_link='',
            naver_link='',
            map_link='',
            search_string='')
        restaurantA.save()

        restaurantB = Restaurant(
            name='restaurantB',
            location=mock_location,
            avg_rating=4,
            preference_vector=mock_prevec,
            food_category='',
            menu='',
            openTime='',
            thumbnail='',
            keyword='',
            kakao_link='',
            naver_link='',
            map_link='',
            search_string='')
        restaurantB.save()

        review = Review(
            restaurant=restaurantA,
            author=authorA,
            content='A wrote this',
            rating=3,
            date=datetime.now(),
            site='atm')
        review.save()
        review = Review(
            restaurant=restaurantA,
            author=authorB,
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
        response = client.get('/atm/restaurant/detail/1/other-review/')
        self.assertEqual(response.status_code, 401)

        location_info = {'x': 127, 'y': 36}
        ### Login successfully ###
        request_body = {
            "email": 'testerA@tester.com',
            "password": '123123',
            "currLoc": location_info
        }
        response = client.post('/atm/sign-in/',
                               request_body,
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        ### Not allowed request ###
        response = client.post('/atm/restaurant/detail/1/other-review/')
        self.assertEqual(response.status_code, 405)
        response = client.put('/atm/restaurant/detail/1/other-review/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/atm/restaurant/detail/1/other-review/')
        self.assertEqual(response.status_code, 405)

        # GET OTHER REVIEW

        # The ideal case
        response = client.get('/atm/restaurant/detail/1/other-review/')
        self.assertEqual(response.status_code, 200)

        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/detail/75/other-review/')
        self.assertEqual(response.status_code, 404)

    def test_get_post_my_review(self):
        client = Client()

        ### Without login case ###
        response = client.get('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 401)
        response = client.post('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 401)

        ### Login successfully ###
        response = client.post('/atm/sign-in/',
                               json.dumps({'email': 'testerA@tester.com',
                                           'password': '123123',
                                           'currLoc': {'x': 127, 'y': 36}
                                           }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)

        ### Not allowed request ###
        response = client.put('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 405)

        ### GET MY REVIEW ###
        # The ideal case
        response = client.get('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 200)

        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/detail/75/my-review/')
        self.assertEqual(response.status_code, 404)

        ### PORST MY REVIEW ###

        # The ideal case
        response = client.post('/atm/restaurant/detail/1/my-review/',
                               json.dumps({'content': 'posted successfully',
                                           'rating': 1}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # Restaurant doesn't exist
        response = client.post('/atm/restaurant/detail/75/my-review/',
                               json.dumps({'content': 'no restaurant',
                                           'rating': 4}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # Wrong data (Bad request)
        response = client.post('/atm/restaurant/detail/75/my-review/',
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
                                           'currLoc': {'x': 127, 'y': 36}
                                           }),
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
