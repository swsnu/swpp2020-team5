from ..user.utils import get_preference_attributes
from ..utils import cos_sim_word, Constants

service_pref_list = Constants.service_pref_list

## R(constant) * (res_i - user_j) * cos_sim(i,j)      * (user_rating - res_avg)

max_value = 5
min_value = 0
pivot = 0.1


def prefvec_update(restaurant_prefvec, user_prefvec, avg_diff):
    # attribute 순서가 고정되어 있다면...
    for user_key in get_preference_attributes(user_prefvec):
        if user_key in service_pref_list:
            continue
        adjust = 0
        for res_key in get_preference_attributes(restaurant_prefvec):
            if user_key in service_pref_list:
                continue
            sim = cos_sim_word(res_key, user_key)
            adjust += (restaurant_prefvec[res_key] -
                       user_prefvec[user_key]) * sim

        # To resemble res_vec, there are two ways.
        if avg_diff > 0:
            # if res > user and updated user > res, truncate user.
            if restaurant_prefvec[user_key] > user_prefvec[user_key]:
                user_prefvec[user_key] += (adjust * avg_diff) * pivot
                if user_prefvec[user_key] > restaurant_prefvec[user_key]:
                    user_prefvec[user_key] = restaurant_prefvec[user_key]
            # if res < user and updated user < res, truncate user.
            else:
                user_prefvec[user_key] += (adjust * avg_diff) * pivot
                if user_prefvec[user_key] < restaurant_prefvec[user_key]:
                    user_prefvec[user_key] = restaurant_prefvec[user_key]
        else:
            user_prefvec[user_key] += (adjust * avg_diff) * pivot

        # This is for situation when user vec becomes a lot farther from res_vec.
        truncate_pref_val(user_prefvec, user_key)
    for factor in ['저렴한', '혼밥하기좋은']:
        user_prefvec[factor] += (restaurant_prefvec[factor] -
                                 user_prefvec[factor]) * avg_diff * pivot
        truncate_pref_val(user_prefvec, factor)

    for factor in ['웨이팅이있는', '불친절한']:
        user_prefvec[factor] -= (restaurant_prefvec[factor] -
                                 user_prefvec[factor]) * avg_diff * pivot
        truncate_pref_val(user_prefvec, factor)

    user_prefvec.save()


def truncate_pref_val(vec, key):
    if vec[key] > max_value:
        vec[key] = max_value
    if vec[key] < min_value:
        vec[key] = min_value
