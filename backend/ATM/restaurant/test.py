'''
restaurant backend testing
'''
from django.test import TestCase, Client
from django.contrib.auth.models import User
from ..models import Restaurant, openTime, menu, ThumbNail, keyword, \
PreferenceVector, Profile, Location


class RestaurantTestCase(TestCase):
    '''
    testing restaurant backend
    '''
    def setUp(self):
        '''
        set up to test
        '''
        User.objects.create_user(username='testerA', password='123123', email='testerA@tester.com')
        user_a = User.objects.get(username='testerA')
        #location
        mock_location_a = Location(x=0, y=0, address_name= 'd')
        mock_location_a.save()
        mock_location_b = Location(x=127, y=39, address_name = 'dd')
        mock_location_b.save()
        #preferenceVector
        mock_prevec = PreferenceVector(매운=0, 느끼한=0, 짭짤한=0, 달달한=0, \
        기름진=0, 고소한=0, 싱거운=0, 신맛이나는=0, 담백한=0, 바삭바삭한=0, 부드러운=0, \
        저렴한=0, 푸짐한=0, 웨이팅이있는=0, 혼밥하기좋은=0)
        mock_prevec.save()
        #restaurant
        mock_restaurant_a = Restaurant(food_category='한식',
                                        preference_vector=mock_prevec,
                                        name='sa', location=mock_location_a,
                                        avg_rating=3.3, kakao_link='www.naver.com',
                                        naver_link='www.naver.com',
                                        map_link='www.naver.com')
        mock_restaurant_a.save()
        mock_restaurant_b = Restaurant(food_category='한식',
                                        preference_vector=mock_prevec,
                                        name='adj',
                                        location=mock_location_b,
                                        avg_rating=3.3,
                                        kakao_link='www.naver.com',
                                        naver_link='www.naver.com',
                                        map_link='www.naver.com')
        mock_restaurant_b.save()
        mock_restaurant_c = Restaurant(food_category='한식',
                                        preference_vector=mock_prevec,
                                        name='sss',
                                        location=mock_location_b,
                                        avg_rating=3.3,
                                        kakao_link='www.naver.com',
                                        naver_link='www.naver.com',
                                        map_link='www.naver.com')
        mock_restaurant_c.save()
        #Profie
        mock_profile_a = Profile(user=user_a,
                                search_location=mock_location_a)
        mock_profile_a.save()
        #menu
        mock_menu_a = menu(name = '짜장면', price=300, restaurant=mock_restaurant_a)
        mock_menu_a.save()
        mock_menu_a = menu(name= 'dd', price=30, restaurant=mock_restaurant_b)
        mock_menu_a.save()
        #openTime
        mock_time_a = openTime(restaurant=mock_restaurant_a, condition='휴무', time='9:00')
        mock_time_a.save()
        mock_time_a = openTime(restaurant=mock_restaurant_b, condition='휴무', time='9:00')
        mock_time_a.save()
        #ThumbNail
        mock_thumbnail_a = ThumbNail(restaurant=mock_restaurant_a, url='www.naver.com')
        mock_thumbnail_a.save()
        mock_thumbnail_a = ThumbNail(restaurant=mock_restaurant_b, url='www.naver.com')
        mock_thumbnail_a.save()
        #keyword
        mock_keyword_a = keyword(restaurant=mock_restaurant_a, word='짠',weight=30)
        mock_keyword_a.save()
        mock_keyword_a = keyword(restaurant=mock_restaurant_b, word='짠',weight=30)
        mock_keyword_a.save()
    def test_main_restaurant(self):
        '''
        main_restaurant function testing
        '''
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
        self.assertEqual(200,response.status_code)

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
            'password': '123123'
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/search/s',
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200,response.status_code)
        response = client.get('/atm/restaurant/search/aaa',
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200,response.status_code)
        response = client.get('/atm/restaurant/search/',
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200,response.status_code)

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
            'password': '123123'
        }
        response = client.post('/atm/sign-in/', request_body,
                               HTTP_X_CSRFTOKEN=csrftoken,
                               content_type='application/json')
        self.assertEqual(204, response.status_code)
        response = client.get('/atm/restaurant/detail/1',
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(200,response.status_code)
        response = client.get('/atm/restaurant/detail/5',
                                content_type='application/json',
                                HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(404,response.status_code)
