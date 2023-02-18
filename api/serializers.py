from rest_framework.serializers import ModelSerializer
from .models import *
class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

class DeliveriesSerializer(ModelSerializer):
    class Meta:
        model = Deliveries
        fields = '__all__'

class CategoriesSerializer(ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class CollectionsSerializer(ModelSerializer):
    class Meta:
        model = Collections
        fields = '__all__'

class ProductPhotosSerializer(ModelSerializer):
    class Meta:
        model = ProductPhotos
        fields = '__all__'

class NewsletterSerializer(ModelSerializer):
    class Meta:
        model = Newsletter
        fields = '__all__'

class MessagesSerializer(ModelSerializer):
    class Meta:
        model = Messages
        fields ='__all__'