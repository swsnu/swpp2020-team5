'''
restaurant backend testing
'''
import json
from datetime import datetime
from django.test import TestCase, Client
from django.contrib.auth.models import User
from ..models import Restaurant, PreferenceVector, Profile, Location, FoodCategory, Review, Author


class RestaurantTestCase(TestCase):
    '''
    testing restaurant backend
    '''

    def setUp(self):
        '''
        set up to test
        '''
        User.objects.create_user(
            username='testerA',
            password='123123',
            email='testerA@tester.com')
        user_a = User.objects.get(username='testerA')
        # location
        mock_location_a = Location(x=0, y=0, address_name='d')
        mock_location_a.save()
        mock_location_b = Location(x=127, y=39, address_name='dd')
        mock_location_b.save()
        # preferenceVector
        mock_prevec = PreferenceVector(매운=3, 느끼한=0, 짭짤한=0, 달달한=0,
                                       고소한=0, 바삭바삭한=0, 부드러운=0,
                                       저렴한=0, 웨이팅이있는=0, 혼밥하기좋은=2, 불친절한=0)
        mock_prevec.save()
        # food_category
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
        # restaurant
        mock_restaurant_a = Restaurant(food_category='한식',
                                       preference_vector=mock_prevec,
                                       name='sa',
                                       location=mock_location_a,
                                       avg_rating=-12,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com',
                                       menu=[{'ddd': '2222'}],
                                       keyword=[{'dd': 33}],
                                       thumbnail=['aaaa', 'bbbb'],
                                       search_string='sadddd',
                                       openTime={'영업 시간': {'ddd': 'ddd'}, '휴무일': {'ㅇㅇㅇ': 'ㅇㅇㅇ'}}
                                       )
        mock_restaurant_a.save()
        mock_restaurant_b = Restaurant(food_category='중식',
                                       preference_vector=mock_prevec,
                                       name='adj',
                                       location=mock_location_b,
                                       avg_rating=3.3,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com',
                                       menu=[{'ddd': '2222'}],
                                       keyword=[{'dd': 33}],
                                       thumbnail=['aaaa', 'bbbb'],
                                       search_string='adjddd',
                                       openTime={'영업 시간': {'ddd': 'ddd'}, '휴무일': {'ㅇㅇㅇ': 'ㅇㅇㅇ'}}
                                       )
        mock_restaurant_b.save()
        mock_restaurant_c = Restaurant(food_category='한식',
                                       preference_vector=mock_prevec,
                                       name='sss',
                                       location=mock_location_b,
                                       avg_rating=3.3,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com',
                                       menu=[{'ddd': '2222'}],
                                       keyword=[{'dd': 33}],
                                       thumbnail=[],
                                       search_string='sssdddd',
                                       openTime={'영업 시간': {'ddd': 'ddd'},
                                                 '휴무일': {'ㅇㅇㅇ': 'ㅇㅇㅇ'}})
        mock_restaurant_c.save()
        mock_restaurant_d = Restaurant(food_category='중식',
                                       preference_vector=mock_prevec,
                                       name='sss',
                                       location=mock_location_a,
                                       avg_rating=33,
                                       kakao_link='www.naver.com',
                                       naver_link='www.naver.com',
                                       map_link='www.naver.com',
                                       menu=[{'ddd': '2222'}],
                                       keyword=[{'dd': 33}],
                                       thumbnail=[],
                                       search_string='sssdddd',
                                       openTime={'영업 시간': {'ddd': 'ddd'},
                                                 '휴무일': {'ㅇㅇㅇ': 'ㅇㅇㅇ'}})
        mock_restaurant_d.save()
        # Profie
        mock_profile_a = Profile(user=user_a,
                                 search_location=mock_location_a,
                                 food_category=food_category,
                                 preference_vector=mock_prevec,
                                 )
        mock_profile_a.save()
        author = Author(
            user=user_a,
            nickname='testerA'
        )
        author.save()
        review = Review(
            restaurant=mock_restaurant_a,
            author=author,
            content='A wrote this',
            rating=3,
            date=datetime.now(),
            site='atm')
        review.save()
        review = Review(
            restaurant=mock_restaurant_a,
            author=author,
            content='B wrote this',
            rating=5,
            date=datetime.now(),
            site='atm')
        review.save()

    # def test_main_restaurant(self):
    #     '''
    #     main_restaurant function testing
    #     '''
    #     client = Client(enforce_csrf_checks=True)
    #     response = client.get('/atm/token/')
    #     csrftoken = response.cookies['csrftoken'].value
    #     response = client.post('/atm/restaurant/search/',
    #                            HTTP_X_CSRFTOKEN=csrftoken,
    #                            content_type='application/json')
    #     self.assertEqual(405, response.status_code)
    #     response = client.get('/atm/restaurant/search/',
    #                 content_type='application/json',
    #                 HTTP_X_CSRFTOKEN=csrftoken)
    #     self.assertEqual(401, response.status_code)
    #     request_body = {
    #         "email": 'testerA@tester.com',
    #         'password': '123123'
    #     }
    #     response = client.post('/atm/sign-in/', request_body,
    #                            HTTP_X_CSRFTOKEN=csrftoken,
    #                            content_type='application/json')
    #     self.assertEqual(204, response.status_code)

    def test_searched_restaurant(self):
        '''
        searched_restaurant fucntion testing
        '''
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
            'password': '123123',
            'currLoc': {'x': 127, 'y': 39}
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/search/s',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        foodcategory = {
            '한식': True,
            '일식': True,
            '중식': False,
            '양식': True,
            '분식': True,
            '술집': True,
            '카페': True,
            '치킨': True,
            '간식': True,
            '퓨전요리': True,
            '아시아음식': True,
            '패스트푸드': True
        }
        response = client.put('/atm/user/food-category/',
                              foodcategory,
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(200, response.status_code)
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
        response = client.get('/atm/restaurant/search/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)

    def test_restaurant_detail(self):
        '''
        restaurant detail testing
        '''
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
            'password': '123123',
            'currLoc': {'x': 127, 'y': 39}
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/detail/1',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/restaurant/detail/4',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200, response.status_code)
        response = client.get('/atm/restaurant/detail/5',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(404, response.status_code)

    def test_other_reviews(self):
        '''
        searched_restaurant fucntion testing
        '''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.get('/atm/restaurant/detail/1/other-review/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'testerA@tester.com',
            'password': '123123',
            'currLoc': {'x': 127, 'y': 39}
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        # The ideal case
        response = client.get('/atm/restaurant/detail/1/other-review/',
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)
        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/detail/75/other-review/',
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(response.status_code, 404)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/restaurant/detail/1/other-review/',
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(405, response.status_code)

    def test_my_reviews(self):
        '''
        searched_restaurant fucntion testing
        '''
        client = Client(enforce_csrf_checks=True)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.get('/atm/restaurant/detail/1/my-review/',
                              content_type='application/json',
                              HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(401, response.status_code)
        request_body = {
            "email": 'testerA@tester.com',
            'password': '123123',
            'currLoc': {'x': 127, 'y': 39}
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/detail/1/my-review/')
        self.assertEqual(response.status_code, 200)

        # Restaurant doesn't exist
        response = client.get('/atm/restaurant/detail/75/my-review/')
        self.assertEqual(response.status_code, 404)

        ### PORST MY REVIEW ###

        # The ideal case

        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        request_body = {
            "content": "dd",
            "rating": 2,
        }
        response = client.post('/atm/restaurant/detail/1/my-review/',
                               request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # Restaurant doesn't exist

        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/restaurant/detail/75/my-review/',
                               json.dumps({'content': 'no restaurant',
                                           'rating': 4}),
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # Wrong data (Bad request)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.post('/atm/restaurant/detail/75/my-review/',
                               json.dumps({'WRONG_CONTENT': 'no restaurant',
                                           'rating': 4}),
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.get('/atm/token/')
        csrftoken = response.cookies['csrftoken'].value
        response = client.put('/atm/restaurant/detail/1/my-review/',
                              HTTP_X_CSRFTOKEN=csrftoken,
                              content_type='application/json')
        self.assertEqual(405, response.status_code)
