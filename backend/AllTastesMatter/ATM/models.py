from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    loginID = models.CharField(max_length=20)
    loginPW = models.CharField(max_length=20)
    searchLocation = models.CharField(max_length=100)
    foodCategory = models.OneToOneField('FoodCategory',
            on_delete=models.CASCADE)
    preference = models.ForeignKey('TasteVector',
            on_delete=models.OneToOneField)

class FoodCategory(models.Model):
    korean = models.BooleanField()
    western = models.BooleanField()
    chinese = models.BooleanField()
    vietnam = models.BooleanField()

class TasteVector(models.Model):
    taste1 = models.FloatField()
    taste2 = models.FloatField()
    taste3 = models.FloatField()

class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    menu = models.CharField(max_length=1000)
    location = models.CharField(max_length=100)
    thumbNail = models.ImageField()
    keywords = models.JSONField()
    avgRating = models.FloatField()
    preference = models.ForeignKey('TasteVector',
            on_delete=models.OneToOneField)

class Review(models.Model):
    restaurant = models.ForeignKey('Restaurant',
            on_delete=models.CASCADE)
    author = models.ForeignKey('Profile',
            on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
    link = models.URLField(max_length=200)
    rating = models.FloatField()
    
class CustomizedRating(models.Model):
    restaurant = models.ForeignKey('Restaurant',
            on_delete=models.CASCADE)
    user = models.ForeignKey('Profile',
            on_delete=models.CASCADE)
    rating = models.FloatField()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, user_pk=instance.id)
    
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
