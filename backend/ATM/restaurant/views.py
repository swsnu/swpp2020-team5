'''
restaurant backend
'''
from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse
from haversine import haversine
from ..models import Restaurant, Profile, Review
from ..utils import cos_sim_word
import math
# preferencVector
scale = 1
pivot = 0.6

def searched_restaurants(request, word=''):
    '''
    when user searchs restaurant
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            response_list = []
            if word != '':
                for restaurant in Restaurant.objects.filter(name__contains=word):
                    #cur = (37.47835220754036, 126.95631398408709)
                    print(author.search_location.x)
                    cur = (author.search_location.y, author.search_location.x)
                    res_loc = (restaurant.location.y, restaurant.location.x)
                    print(haversine(cur, res_loc))
                    if haversine(cur, res_loc) >= 10:
                        continue
                    response_dict = {}
                    review_cnt = Review.objects.filter(restaurant = restaurant).count() + 2
                    response_dict['id'] = restaurant.id
                    response_dict['title'] = restaurant.name
                    response_dict['category'] = restaurant.food_category
                    if len(restaurant.thumbnail) != 0:
                        response_dict['img_url'] = restaurant.thumbnail[0]
                    else: 
                        response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                    restaurant_pref_vec = restaurant.preference_vector
                    restaurant_attr_list = get_preference_attributes(
                        restaurant_pref_vec)
                    restaurant_pref_dict = {}
                    for attr in restaurant_attr_list:
                        restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                    res = sorted(restaurant_pref_dict.items(), key= lambda x: x[1], reverse=True)
                    i = 0
                    sorted_dict = {}
                    while True:
                        if i == 3:
                            break
                        sorted_dict[res[i][0]] = res[i][1]
                        i += 1
                    print(response_dict['title'])
                    response_dict['preferenceVector'] = sorted_dict
                    response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict,restaurant.avg_rating )
                    response_dict['rate-review'] = response_dict['rate'] * math.log2(review_cnt)
                    response_list.append(response_dict)
            else:
                for restaurant in Restaurant.objects.all():
                    #cur = (37.47835220754036, 126.95631398408709)
                    print(author.search_location.x)
                    cur = (author.search_location.y, author.search_location.x)
                    res_loc = (restaurant.location.y, restaurant.location.x)
                    if haversine(cur, res_loc) >= 10:
                        continue
                    response_dict = {}
                    review_cnt = Review.objects.filter(restaurant = restaurant).count() + 2
                    response_dict['id'] = restaurant.id
                    response_dict['title'] = restaurant.name
                    response_dict['category'] = restaurant.food_category
                    if len(restaurant.thumbnail) != 0:
                        response_dict['img_url'] = restaurant.thumbnail[0]
                    else: 
                        response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                    restaurant_pref_vec = restaurant.preference_vector
                    restaurant_attr_list = get_preference_attributes(
                        restaurant_pref_vec)
                    restaurant_pref_dict = {}
                    for attr in restaurant_attr_list:
                        restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                    res = sorted(restaurant_pref_dict.items(), key= lambda x: x[1], reverse=True)
                    i = 0
                    sorted_dict = {}
                    while True:
                        if i == 3:
                            break
                        sorted_dict[res[i][0]] = res[i][1]
                        i += 1
                    print(response_dict['title'])
                    response_dict['preferenceVector'] = sorted_dict
                    response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict,restaurant.avg_rating )
                    response_dict['rate-review'] = response_dict['rate'] * math.log2(review_cnt)
                    response_list.append(response_dict)
            '''
            for restaurant in Restaurant.objects.filter(name__contains=word):
                # cur = (author.search_location.y, author.search_location.x)
                cur = (37.47835220754036, 126.95631398408709)
                res_loc = (restaurant.location.y, restaurant.location.x)
                if haversine(cur, res_loc,unit = "km" ) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                if len(restaurant.thumbnail) != 0:
                    response_dict['img_url'] = restaurant.thumbnail[0]
                else: 
                    response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                res = sorted(restaurant_pref_dict.items(), key = lambda x: x[1], reverse=True)
                i = 0
                sorted_dict = {}
                while True:
                    if i == 3:
                        break
                    sorted_dict[res[i][0]] = res[i][1]
                    i += 1
                response_dict['preferenceVector'] = sorted_dict
                print(response_dict['title'])
                response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict, restaurant.avg_rating )
                response_list.append(response_dict)
            '''
            #response list sorted by rate
            result_list = sorted(response_list, key = lambda x: x['rate'], reverse= True)
            return JsonResponse(result_list, safe=False, status = 200)
        return HttpResponse(status = 401)
    return HttpResponseNotAllowed(['GET'])

def restaurant_detail(request,restaurant_id):
    '''
    restaurant's detail page
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                restaurant = Restaurant.objects.get(id = restaurant_id)
            except Restaurant.DoesNotExist:
                return HttpResponse(status = 404)
            author = Profile.objects.get(user=request.user)
            author_pref_vec = author.preference_vector
            author_attr_list = get_preference_attributes(author_pref_vec)
            author_pref_dict = {}
            for attr in author_attr_list:
                author_pref_dict[attr] = author_pref_vec[attr]
            restaurant_pref_vec = restaurant.preference_vector
            restaurant_attr_list = get_preference_attributes(restaurant_pref_vec)
            restaurant_pref_dict = {}
            for attr in restaurant_attr_list:
                restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.food_category
            response_dict['rate'] = get_customized_rating(restaurant_pref_dict, author_pref_dict, restaurant.avg_rating )
            response_dict['difference'] = response_dict['rate'] - restaurant.avg_rating
            if len(restaurant.thumbnail) != 0:
                response_dict['img_url'] = restaurant.thumbnail[0]
                response_dict['img_url_list'] = restaurant.thumbnail
            else: 
                response_dict['img_url'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
                response_dict['img_url_list'] = 'https://img1.daumcdn.net/thumb/R1920x0.q100/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2Freview%2F2ce1e5c563f8149350b8e65fe1acab0da2ed287c7f7cca248b17784268585dd0'
            response_dict['menu'] = restaurant.menu
            response_dict['time'] = restaurant.openTime
            response_dict['keywords'] = restaurant.keyword
            response_dict['urls'] = [
                restaurant.kakao_link,
                restaurant.naver_link]
            response_dict['location'] = restaurant.location.address_name
            response_dict['location_link'] = restaurant.map_link
            return JsonResponse(response_dict, status = 200)
        return HttpResponse(status = 401)
    return HttpResponseNotAllowed(['GET'])

def get_preference_attributes(pref_vec):
    '''
    get preference vector's key
    '''
    no_need_attr = ['_state', 'id']
    attr_list = list(pref_vec.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr not in no_need_attr:
            new_attr_list.append(attr)
    return new_attr_list

def get_customized_rating(restaurant_pref, user_pref, avg_rating):
    '''
    get customized rating
    '''
    diff = 0
    for restaurant_factor in restaurant_pref:
        for user_factor in user_pref:
            if restaurant_pref[restaurant_factor] == 0 :
                continue
            similarity = cos_sim_word(user_factor, restaurant_factor)
            diff += similarity * (pivot - abs(restaurant_pref[restaurant_factor]- user_pref[user_factor]))
    return round(avg_rating + scale * diff,2)