# Generated by Django 3.1.3 on 2020-12-15 12:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ATM', '0004_location_radius'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='preferencevector',
            name='싱거운',
        ),
    ]
