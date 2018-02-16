from rest_framework import serializers
from .models import Recipe, Review, Category, Ingredient, Description

class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id', 'title', 'ingredients')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'title', 'text', 'review_date', 'recipe')

class IngrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name')

class InstrSerializer(serializers.ModelSerializer):
    class Meta:
        model = Description
        fields = ('id', 'name', 'recipe')
