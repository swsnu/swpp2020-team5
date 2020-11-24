from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.postgres.fields import ArrayField


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

    매운 = models.FloatField()
    느끼한 = models.FloatField()
    짭짤한 = models.FloatField()
    달달한 = models.FloatField()
    기름진 = models.FloatField()
    고소한 = models.FloatField()
    싱거운 = models.FloatField()
    신맛이나는 = models.FloatField()
    담백한 = models.FloatField()
    바삭바삭한 = models.FloatField()
    부드러운 = models.FloatField()
    저렴한 = models.FloatField()
    푸짐한 = models.FloatField()
    웨이팅이있는 = models.FloatField()
    혼밥하기좋은 = models.FloatField()

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
            )
    food_category = models.CharField(max_length=100)
    # menu = models.JSONField() # dict{name(str): price(int)}
    # openTime = models.JSONField() # dict{label(str): time(str)}
    # thumbNail = ArrayField(URLField(max_length=200)) # list[thunbNail_link(str)]
    # keyword = models.JSONField() # dict{keyword(str): weight(int)}
    kakao_link = models.URLField()
    naver_link = models.URLField()
    map_link = models.URLField()

class menu(models.Model):
    name = models.CharField(max_length=20)
    price = models.IntegerField()
    restaurant = models.ForeignKey(
            Restaurant,
            on_delete=models.CASCADE,
            related_name='menu',
            )

class openTime(models.Model):
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

class keyword(models.Model):
    word = models.CharField(max_length=20)
    weight = models.IntegerField()
    restaurant = models.ForeignKey(
            Restaurant,
            on_delete=models.CASCADE,
            related_name='keyword',
            )

class Review(models.Model):
    restaurant = models.ForeignKey(
            Restaurant,
            on_delete=models.CASCADE,
            related_name='review'
            )
    author = models.ForeignKey(
            Profile,
            on_delete=models.CASCADE,
            related_name='review'
            )
    content = models.CharField(max_length=1000)
    rating = models.FloatField()
    date = models.DateTimeField()
    site = models.CharField(max_length=10) # one of naver, kakao or atm.
