from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

app_name = 'main'

urlpatterns = [
    path('get_products', get_products, name='get_products'),
    path('get_products/<slug:slug>', get_product, name='get_product'),
    path('get_photos/<slug:slug>', get_photos, name="get_photos"),
    path('get_products_by_category/<str:category>', get_products_by_category, name='get_products_by_category'),
    path('get_products_by_collection/<str:collection>', get_products_by_collection, name='get_products_by_collection'),
    path('get_deliveries', get_deliveries, name='get_deliveries'),
    path('post_order', post_order, name='post_order'),
    path('get_categories', get_categories, name='get_categories'),
    path('get_collections', get_collections, name='get_collections'),
    path('get_bestsellers', get_bestsellers, name='get_bestsellers'),
    path('get_home_bestsellers', get_home_bestsellers, name='get_home_bestsellers'),
    path('get_new_collection', get_new_collection, name='get_new_collection'),
    path('post_newsletter', post_newsletter, name='post_newsletter'),
    path('post_message', post_message, name='post_message'),
    path('get_search/<str:search>', get_search, name='get_search'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)