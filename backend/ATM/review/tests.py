from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseForbidden
from django.test import TestCase, Client
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt
from ATM.models import Review, Restaurant, Profile, Location, PreferenceVector
from datetime import datetime


class ReviewTestCase(TestCase):
    def setUp(self):

        User.objects.create_user(username='testerA', password='123123', email='testerA@tester.com')
        User.objects.create_user(username='testerB', password='123123', email='testerB@tester.com')
        userA = User.objects.get(username='testerA')
        userB = User.objects.get(username='testerB')
        profileA = Profile(user=userA);
        profileA.save()
        profileB = Profile(user=userB);
        profileB.save()

        mock_location = Location(x=0, y=0, address_name='')
        mock_location.save()
        mock_prevec = PreferenceVector(매운=0, 느끼한=0, 짭짤한=0, 달달한=0, 기름진=0, 고소한=0, 싱거운=0, 신맛이나는=0, 담백한=0, 바삭바삭한=0, 부드러운=0, 저렴한=0, 푸짐한=0, 웨이팅이있는=0, 혼밥하기좋은=0)
        mock_prevec.save()
        restaurantA = Restaurant(name='restaurantA', location=mock_location, avg_rating=4, preference_vector=mock_prevec, food_category='', naver_link='', kakao_link='') 
        restaurantA.save()

        review = Review(restaurant=restaurantA, author=profileA, content='A wrote this', rating=3, date=datetime.now(), site='atm')
        review.save()
        review = Review(restaurant=restaurantA, author=profileB, content='B wrote this', rating=5, date=datetime.now(), site='atm')
        review.save()

    def test_review_count(self):
        self.assertEqual(Review.objects.all().count(), 2)

    def test_get_other_reviews(self):
        client = Client()

        #The ideal case
        response = client.post('/atm/sign-in', json.dumps({}))
        response = client.get('/atm/restaurant/1/other-review')
        self.assertEqual(response.status_code, 200)

        pass

    def test_get_post_my_review(self):
        pass

    def test_edit_my_review(self):
        pass





