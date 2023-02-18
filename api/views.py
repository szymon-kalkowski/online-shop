from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import *
from .models import Products, Deliveries, Orders, OrderItems

from django.http import Http404

from .utils import send_message

@api_view(['GET'])
def get_products(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_products_by_category(request, category):
    products = Products.objects.filter(category=category)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_products_by_collection(request, collection):
    products = Products.objects.filter(collection=collection)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, slug):
    try: 
        products = Products.objects.get(slug=slug)
        serializer = ProductsSerializer(products, many=False)
    except: 
        raise Http404
    return Response(serializer.data)

@api_view(['GET'])
def get_deliveries(requset):
    deliveries = Deliveries.objects.all()
    serializer = DeliveriesSerializer(deliveries, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def post_order(request):
    data = request.data
    order = Orders(name=data["name"], last_name=data["lastName"],
    email=data["email"], phone=data["phone"], city=data["city"],
    zipcode=data["zipcode"], street=data["street"], local=data["local"],
    info=data["info"], sum=data["sum"], delivery=data["delivery"])
    order.save()

    for i in data["cart"]:
        product = Products.objects.get(slug=i["slug"])
        item = OrderItems(product=product, order=order, size=i["size"], amount=i["amount"])
        item.save()
    return Response(request.data)

@api_view(['GET'])
def get_categories(request):
    categories = Categories.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_collections(request):
    collections = Collections.objects.all()
    serializer = CollectionsSerializer(collections, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_bestsellers(request):
    bestsellers = Products.objects.filter(bestseller=True)
    serializer = ProductsSerializer(bestsellers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_home_bestsellers(request):
    bestsellers = Products.objects.filter(bestseller=True)[:3]
    serializer = ProductsSerializer(bestsellers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_new_collection(request):
    collection = Collections.objects.all().order_by("-id")[:1][0]
    collection_name = collection.name
    products = Products.objects.filter(collection=collection_name)[:3]
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_photos(request, slug):
    product = Products.objects.get(slug=slug)
    photos = ProductPhotos.objects.filter(product=product)
    serializer = ProductPhotosSerializer(photos, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def post_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def post_message(request):
    serializer = MessagesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        send_message(request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_search(request, search):
    products = Products.objects.filter(name__icontains=search)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)