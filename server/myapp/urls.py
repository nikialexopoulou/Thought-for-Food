from django.conf.urls import url

from . import views

app_name = 'myapp'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^category/search', views.search, name='search'),
    url(r'^category/(?P<cat_id>[0-9]+)/$', views.categories, name='category'),
    url(r'^category/(?P<cat_id>[0-9]+)/recipes/$', views.recipes, name='recipes'),
    url(r'^category/(?P<recipe_id>[0-9]+)/reviews/$', views.reviews, name='reviews'),
    url(r'^category/(?P<recipe_id>[0-9]+)/ingredients/$', views.ingredients, name='ingredients'),
    url(r'^category/(?P<recipe_id>[0-9]+)/instructions/$', views.instructions, name='instructions'),
    url(r'^category/(?P<recipe_id>[0-9]+)/review/(?P<review_id>[0-9]+)$', views.review, name='review'),
    url(r'^category/(?P<recipe_id>[0-9]+)/review/$', views.review, name='review'),
    url(r'^categories/?$', views.CatList.as_view()),
    url(r'^categories/(?P<pk>[0-9]+)/?$', views.CatDetail.as_view()),
    url(r'^recipes/?$', views.RecipeList.as_view()),
    url(r'^recipes/(?P<pk>[0-9]+)/?$', views.RecipeDetail.as_view()),
    url(r'^recipes/(?P<recipe_id>[0-9]+)/reviews/?$', views.ReviewList.as_view()),
    url(r'^recipes/(?P<recipe_id>[0-9]+)/ingredients/?$', views.IngrList.as_view()),
    url(r'^recipes/(?P<recipe_id>[0-9]+)/ingredients/search/?$', views.ingredients),
    url(r'^recipes/(?P<recipe_id>[0-9]+)/instructions/?$', views.InstrList.as_view()),
    url(r'^recipes/(?P<recipe_id>[0-9]+)/reviews/(?P<pk>[0-9]+)/?$', views.ReviewDetail.as_view()),
]
