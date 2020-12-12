from ..user.utils import get_preference_attributes
from ..utils import cos_sim_word


## R(constant) * (res_i - user_j) * cos_sim(i,j)      * (user_rating - res_avg)

max_value = 5
min_value = 0


def prefvec_update(restaurant_prefvec, user_prefvec, avg_diff):
    # attribute 순서가 고정되어 있다면...
    for user_key in get_preference_attributes(user_prefvec):
        adjust = 0
        for res_key in get_preference_attributes(restaurant_prefvec):
            sim = cos_sim_word(res_key, user_key)
            adjust += (restaurant_prefvec[res_key] -
                       user_prefvec[user_key]) * sim

        user_prefvec[user_key] += (adjust * avg_diff)
        if user_prefvec[user_key] > max_value:
            user_prefvec[user_key] = max_value
        if user_prefvec[user_key] < min_value:
            user_prefvec[user_key] = min_value
    user_prefvec.save()
