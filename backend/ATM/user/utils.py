# func for getting preference vector's attributes from PreferenceVector object.
def get_preference_attributes(pref_vec):
    no_need_attr = ['_state', 'id']
    attr_list = list(pref_vec.__dict__.keys())
    new_attr_list = []
    for attr in attr_list:
        if attr not in no_need_attr:
            new_attr_list.append(attr)
    return new_attr_list
