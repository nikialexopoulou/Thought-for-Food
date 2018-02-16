# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-06 15:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_auto_20180206_1750'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='ing',
        ),
        migrations.AddField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='myapp.Recipe'),
        ),
    ]