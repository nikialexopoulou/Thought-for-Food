from django.shortcuts import render, get_object_or_404
from django.http import *
from .models import Recipe, Category, Review, Description, Ingredient
from django.urls import reverse
from django.utils import timezone
from .serializers import RecipeSerializer, ReviewSerializer, CatSerializer, InstrSerializer, IngrSerializer
from rest_framework import generics
from django.contrib.staticfiles import views

from rest_framework import permissions

def index(request):
    cat_all = Category.objects.order_by('name')
    ing_all = Ingredient.objects.order_by('name')
    context = {'cat_all': cat_all, 'ing_all': ing_all}
    return render(request, 'myapp/index.html', context)

def index2(request, path=''):
    if (path.endswith('.js')):
        return views.serve(request, path)
    else:
        return views.serve(request, 'index.html')

class RecipeList(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        queryset = Recipe.objects.all()
        title = self.request.query_params.get('title', None)
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class ReviewList(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Review.objects.all()
        recipe_id = self.kwargs.get('recipe_id', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe=recipe_id)
        return queryset

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class CatList(generics.ListCreateAPIView):
    serializer_class = CatSerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        cat_id = self.kwargs.get('cat_id', None)
        if cat_id is not None:
            queryset = queryset.filter(category=cat_id)
        return queryset

class CatDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CatSerializer

def categories(request, cat_id):
    cat = get_object_or_404(Category, pk=cat_id)
    return render(request, 'myapp/recipes.html', {'cat': cat})

def recipes(request, cat_id):
    cat = get_object_or_404(Category, pk=cat_id)
    return render(request, 'myapp/reviews.html', {'cat': cat })
    #return HttpResponse("You are looking at category %s." % cat_id)

def ingredients(request, recipe_id=None):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    return render(request, 'myapp/ingredients.html', {'recipe': recipe })

class IngrList(generics.ListCreateAPIView):
    serializer_class = IngrSerializer

    def get_queryset(self):
        queryset = Ingredient.objects.all()
        recipe_id = self.kwargs.get('recipe_id', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe=recipe_id)
        return queryset

def instructions(request, recipe_id):
    instr = Description.objects.filter(recipe_id=recipe_id)
    return render(request, 'myapp/instructions.html', {'instr': instr })

class InstrList(generics.ListCreateAPIView):
    serializer_class = InstrSerializer

    def get_queryset(self):
        queryset = Description.objects.all()
        recipe_id = self.kwargs.get('recipe_id', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe=recipe_id)
        return queryset
def reviews(request, recipe_id):
    rec_reviews = Review.objects.filter(recipe_id=recipe_id)
    return render(request, 'myapp/reviews.html', {'rec_reviews': rec_reviews })

def review(request, recipe_id, review_id=None):
    if review_id is not None:
        review = get_object_or_404(Review, pk=review_id)
    else:
        review = Review()
        review.recipe_id = recipe_id
    if request.method == 'POST':
        review.title = request.POST['title']
        review.text = request.POST['text']
        review.review_date = timezone.now()
        review.save()
        return HttpResponseRedirect(reverse('myapp:reviews', args=(recipe_id,)))
    else:
        context = {
        'recipe_id': recipe_id,
        'review_id': review_id,
        'title': review.title,
        'text': review.text
    }
    return render(request, 'myapp/review.html', context)

def search(request):
    form = request.POST.getlist('item')
    recipe = Recipe.objects.all()
    recipeList = []
    print(form)
    for i in recipe:
        li = []
        ing = Ingredient.objects.filter(id=i.id)
        for j in form:
            for k in ing:
                print(j, k)
                if (str(k) == str(j)):
                    li.append(j)
        if (len(form) != 0 and set(form) <= set(li)):
            recipeList.append(i)

    return render(request, 'myapp/search.html', {'recipeList': recipeList })
