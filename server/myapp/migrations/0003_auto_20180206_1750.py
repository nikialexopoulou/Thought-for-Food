# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-06 15:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_description_ingredient_review'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ingredient',
            name='recipes',
        ),
        migrations.AddField(
            model_name='recipe',
            name='ing',
            field=models.ManyToManyField(to='myapp.Ingredient'),
        ),
    ]
