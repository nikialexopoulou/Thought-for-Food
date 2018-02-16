from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class Ingredient(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name;

class Recipe(models.Model):
    title = models.CharField(max_length=200)
    calories = models.IntegerField('Calories')
    ingredients = models.ManyToManyField(Ingredient, default="")

    def __str__(self):
        return "%s %s" % (self.title, self.calories)

class Description(models.Model):
    name = models.TextField(max_length=5000, default="")
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)

    def __str__(self):
        return self.name;

class Category(models.Model):
    name = models.CharField(max_length=200)
    recipes = models.ManyToManyField(Recipe)

    def __str__(self):
        return self.name;

class Review(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField(default="")
    review_date = models.DateTimeField('review date')
