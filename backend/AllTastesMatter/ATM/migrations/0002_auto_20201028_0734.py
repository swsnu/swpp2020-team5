# Generated by Django 3.1.2 on 2020-10-28 07:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.fields.related


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ATM', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomizedRating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='FoodCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('korean', models.BooleanField()),
                ('western', models.BooleanField()),
                ('chinese', models.BooleanField()),
                ('vietnam', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_pk', models.IntegerField(blank=True)),
                ('name', models.CharField(max_length=200)),
                ('loginID', models.CharField(max_length=20)),
                ('loginPW', models.CharField(max_length=20)),
                ('searchLocation', models.CharField(max_length=100)),
                ('foodCategory', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='ATM.foodcategory')),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('menu', models.CharField(max_length=1000)),
                ('location', models.CharField(max_length=100)),
                ('thumbNail', models.ImageField(upload_to='')),
                ('keywords', models.JSONField()),
                ('avgRating', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=1000)),
                ('link', models.URLField()),
                ('rating', models.FloatField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ATM.profile')),
                ('restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ATM.restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='TasteVector',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('taste1', models.FloatField()),
                ('taste2', models.FloatField()),
                ('taste3', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='ATM',
        ),
        migrations.AddField(
            model_name='restaurant',
            name='preference',
            field=models.ForeignKey(on_delete=django.db.models.fields.related.OneToOneField, to='ATM.tastevector'),
        ),
        migrations.AddField(
            model_name='profile',
            name='preference',
            field=models.ForeignKey(on_delete=django.db.models.fields.related.OneToOneField, to='ATM.tastevector'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='customizedrating',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ATM.restaurant'),
        ),
        migrations.AddField(
            model_name='customizedrating',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ATM.profile'),
        ),
    ]