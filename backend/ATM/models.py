from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class FoodCategory(models.Model):
    def __getitem__(self, key):
        return getattr(self, key)
    한식 = models.BooleanField()
    일식 = models.BooleanField()
    중식 = models.BooleanField()
    양식 = models.BooleanField()
    카페 = models.BooleanField()
    기타 = models.BooleanField()

class Location(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    addressName = models.CharField(max_length=100)

class PreferenceVector(models.Model):
    def __getitem__(self, key):
        return getattr(self, key)
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
    name = models.CharField(max_length=100)
    searchLocation = models.CharField(max_length=100)
    foodCategory = models.ForeignKey(
            FoodCategory,
            on_delete=models.PROTECT,
            )
    preferenceVector = models.ForeignKey(
            PreferenceVector,
            on_delete=models.PROTECT,
            )
    searchLocation = models.ForeignKey(
            Location,
            on_delete=models.PROTECT,
            )

class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    location = models.ForeignKey(
            Location,
            on_delete=models.PROTECT,
            )
    avgRating = models.FloatField()
    preferenceVector = models.ForeignKey(
            PreferenceVector,
            on_delete=models.PROTECT,
            )
    foodCategory = models.CharField(max_length=100)
    # menu = models.JSONField() # dict{name(str): price(int)}
    # openTime = models.JSONField() # dict{label(str): time(str)}
    # thumbNail = ArrayField(URLField(max_length=200)) # list[thunbNail_link(str)]
    # keyword = models.JSONField() # dict{keyword(str): weight(int)}
    kakaoLink = models.URLField()
    naverLink = models.URLField()

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
    source = models.CharField(max_length=10) # one of naver, kakao or atm.

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, user_pk=instance.id)
    
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
