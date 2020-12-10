from django.db import models
from django.contrib.auth.models import User
#from django.contrib.postgres.fields import ArrayField

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


    한식 = models.BooleanField(default=True)
    일식 = models.BooleanField(default=True)
    중식 = models.BooleanField(default=True)
    양식 = models.BooleanField(default=True)
    분식 = models.BooleanField(default=True)
    술집 = models.BooleanField(default=True)
    카페 = models.BooleanField(default=True)
    치킨 = models.BooleanField(default=True)
    간식 = models.BooleanField(default=True)
    퓨전요리 = models.BooleanField(default=True)
    아시아음식 = models.BooleanField(default=True)
    패스트푸드 = models.BooleanField(default=True)


class Location(models.Model):
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)
    x = models.FloatField(default=0.0)
    y = models.FloatField(default=0.0)
    address_name = models.TextField()


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
    name = models.TextField()
    location = models.ForeignKey(
        Location,
        on_delete=models.PROTECT,
    )
    avg_rating = models.FloatField()
    preference_vector = models.ForeignKey(
        PreferenceVector,
        on_delete=models.PROTECT,
        null=True,
    )
    food_category = models.TextField()
    menu = models.JSONField()# dict{name(str): price(int)}
    openTime = models.JSONField() # dict{label(str): time(str)}
    thumbnail = models.JSONField() # list[thumbnail_link(str)]
    keyword = models.JSONField(null=True) # dict{keyword(str): weight(int)}
    kakao_link = models.TextField()
    naver_link = models.TextField()
    map_link = models.TextField()
    search_string = models.TextField()

# This can be ATM or other-sites' user so user can be null.
class Author(models.Model):
    user = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            related_name='author',
            null=True,
            )
    nickname = models.TextField()


class Review(models.Model):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='review'
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='review',
        null=True,
    )
    content = models.TextField()
    rating = models.FloatField()

    date = models.DateField()
    site = models.TextField()  # one of naver, kakao or atm.
