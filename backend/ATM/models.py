from django.db import models
from django.contrib.auth.models import User
<<<<<<< HEAD
#from django.contrib.postgres.fields import ArrayField
=======
>>>>>>> 52d90d71e659911df20523665ed47e6c8dc1552f

# Create your models here.
class FoodCategory(models.Model):
    """
    Below function is for using model like this.
    fc = FoodCategory()
    fc["한식"] = true
    """

    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    한식 = models.BooleanField(default=False)
    일식 = models.BooleanField(default=False)
    중식 = models.BooleanField(default=False)
    양식 = models.BooleanField(default=False)
    카페 = models.BooleanField(default=False)
    기타 = models.BooleanField(default=False)


class Location(models.Model):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)
    x = models.FloatField(default=0.0)
    y = models.FloatField(default=0.0)
    address_name = models.CharField(max_length=100)


class PreferenceVector(models.Model):
    """
    Below function is for using model like this.
    pf = PreferenceVector()
    pf["매운"] = 0.5
    """

    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    # 0~1.0
    매운 = models.FloatField(default=0.0)
    느끼한 = models.FloatField(default=0.0)
    짭짤한 = models.FloatField(default=0.0)
    달달한 = models.FloatField(default=0.0)
    고소한 = models.FloatField(default=0.0)
    싱거운 = models.FloatField(default=0.0)
    담백한 = models.FloatField(default=0.0)
    바삭바삭한 = models.FloatField(default=0.0)
    부드러운 = models.FloatField(default=0.0)
    저렴한 = models.FloatField(default=0.0)
    웨이팅이있는 = models.FloatField(default=0.0)
    혼밥하기좋은 = models.FloatField(default=0.0)
    불친절한 = models.FloatField(default=0.0)



class Profile(models.Model):
    # user include email and password
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )
    search_location = models.ForeignKey(
        Location,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        default='',
    )
    food_category = models.ForeignKey(
        FoodCategory,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        default='',
    )
    preference_vector = models.ForeignKey(
        PreferenceVector,
        on_delete=models.PROTECT,
        blank=True,
        null=True,
        default='',
    )


class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    location = models.ForeignKey(
        Location,
        on_delete=models.PROTECT,
    )
    avg_rating = models.FloatField()
    preference_vector = models.ForeignKey(
        PreferenceVector,
        on_delete=models.PROTECT,
<<<<<<< HEAD
        null=True,
=======
>>>>>>> 52d90d71e659911df20523665ed47e6c8dc1552f
    )
    food_category = models.CharField(max_length=100)
    menu = models.JSONField()# dict{name(str): price(int)}
    openTime = models.JSONField() # dict{label(str): time(str)}
    #thumbNail = ArrayField(models.URLField(max_length=200)) # list[thunbNail_link(str)]
    thumbnail = models.JSONField()
    keyword = models.JSONField(null=True) # dict{keyword(str): weight(int)}
    kakao_link = models.URLField()
    naver_link = models.URLField()
    map_link = models.URLField()
<<<<<<< HEAD
=======


class Menu(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='menu',
    )


class OpenTime(models.Model):
    condition = models.CharField(max_length=20)
    time = models.CharField(max_length=20)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='openTime',
    )


class ThumbNail(models.Model):
    url = models.URLField(max_length=500)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='thumbNail',
    )


class Keyword(models.Model):
    word = models.CharField(max_length=20)
    weight = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='keyword',
    )

>>>>>>> 52d90d71e659911df20523665ed47e6c8dc1552f

class Review(models.Model):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='review'
    )
<<<<<<< HEAD
    atm_author = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='review',
        null=True,
    )
    other_site_author = models.CharField(max_length=100,\
                                         null=True)
=======
    author = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='review'
    )
>>>>>>> 52d90d71e659911df20523665ed47e6c8dc1552f
    content = models.CharField(max_length=1000)
    rating = models.FloatField()
    date = models.DateTimeField()
    site = models.CharField(max_length=10)  # one of naver, kakao or atm.
