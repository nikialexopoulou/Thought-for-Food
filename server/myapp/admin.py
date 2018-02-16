from django.contrib import admin

from .models import Recipe, Review, Category, Ingredient, Description

admin.site.register(Recipe)
admin.site.register(Review)
admin.site.register(Category)
admin.site.register(Ingredient)
admin.site.register(Description)
