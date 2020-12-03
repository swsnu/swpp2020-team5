'''
restaurant backend
'''
from django.http import HttpResponse, HttpResponseNotAllowed,JsonResponse
from haversine import haversine
from ..models import Restaurant, Profile

# preferencVector

def main_restaurants(request):
    '''
    default main page
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            author = Profile.objects.get(user=request.user)
            response_list = []
            for restaurant in Restaurant.objects.all():
                cur = (author.search_location.y, author.search_location.x)
                res_loc = (restaurant.location.y, restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                response_dict['rate'] = 3.5
                thumbnail = ThumbNail.objects.select_related('restaurant') \
                            .get(restaurant=restaurant)
                response_dict['img_url'] = thumbnail.url
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                response_dict['preferenceVector'] = restaurant_pref_dict
                response_list.append(response_dict)
            return JsonResponse(response_list, safe=False, status = 200)
        return HttpResponse(status = 401)
    return HttpResponseNotAllowed(['GET'])
def searched_restaurants(request,word):
    '''
    when user searchs restaurant
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:

            author = Profile.objects.get(user=request.user)
            response_list = []
            for restaurant in Restaurant.objects.filter(name__contains=word):
                cur = (author.search_location.y, author.search_location.x)
                res_loc = (restaurant.location.y, restaurant.location.x)
                if haversine(cur, res_loc) >= 10:
                    continue
                response_dict = {}
                response_dict['id'] = restaurant.id
                response_dict['title'] = restaurant.name
                response_dict['category'] = restaurant.food_category
                response_dict['rate'] = 3.5
                thumbnail = ThumbNail.objects.select_related('restaurant') \
                            .get(restaurant=restaurant)
                response_dict['img_url'] = thumbnail.url
                restaurant_pref_vec = restaurant.preference_vector
                restaurant_attr_list = get_preference_attributes(
                    restaurant_pref_vec)
                restaurant_pref_dict = {}
                for attr in restaurant_attr_list:
                    restaurant_pref_dict[attr] = restaurant_pref_vec[attr]
                response_dict['preferenceVector'] = restaurant_pref_dict
                response_list.append(response_dict)
            return JsonResponse(response_list, safe= False, status = 200)
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
            response_dict = {}
            response_dict['id'] = restaurant.id
            response_dict['name'] = restaurant.name
            response_dict['category'] = restaurant.food_category
            response_dict['rate'] = 3.5
            response_dict['difference'] = 3.5 - restaurant.avg_rating
            response_dict['img_url'] = restaurant.thumbNail[0]
            response_dict['img_url_list'] = restaurant.thumbNail
            response_dict['menu'] = restaurant.menu
            response_dict['time'] = restaurant.openTime
            response_dict['keywords'] = restaurant.keyword
            """
            thumbnail_list = []
            for thumbnail in ThumbNail.objects.select_related('restaurant') \
            .filter(restaurant=restaurant):

                thumbnail_list.append(thumbnail.url)
            response_dict['img_url'] = thumbnail_list[0]
            response_dict['img_url_list'] = thumbnail_list
            menu_list = []
            for price in Menu.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                menu_list.append({price.name: price.price})
            response_dict['menu'] = menu_list
            open_list = []
            for time in OpenTime.objects.select_related('restaurant').filter(restaurant=restaurant):
                open_list.append({time.condition : time.time})
            response_dict['time'] = open_list
            keyword_list = []
            for key in Keyword.objects.select_related(
                    'restaurant').filter(restaurant=restaurant):
                keyword_list.append({key.word: key.weight})
            response_dict['keywords'] = keyword_list
            """
            response_dict['urls'] = [
                restaurant.kakao_link,
                restaurant.naver_link]
            response_dict['location'] = restaurant.location.address_name
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
