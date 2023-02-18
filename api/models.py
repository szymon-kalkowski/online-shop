from django.db import models
from django.db.models.signals import pre_save, post_save
from .utils import slugify_instance_name

class Newsletter(models.Model):
    email = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.email

    class Meta:
        verbose_name = 'Newsletter'
        verbose_name_plural = 'Newsletter'

class Messages(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    topic = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)

    def __str__(self) -> str:
        return self.topic + " - " + self.name

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'

class Deliveries(models.Model):
    name = models.CharField(max_length=100, blank=False)
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=False)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name="Delivery"
        verbose_name_plural="Deliveries"

class Categories(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name
        
    class Meta:
        verbose_name="Category"
        verbose_name_plural="Categories"

class Collections(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100, unique=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name="Collection"
        verbose_name_plural="Collections"

class Products(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Categories, null=True, blank=True, on_delete=models.CASCADE, to_field="name")
    collection = models.ForeignKey(Collections, null=True, blank=True, on_delete=models.CASCADE, to_field="name")
    photo = models.FileField(blank=False)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    bestseller = models.BooleanField(default=False)
    data = models.TextField(max_length=1000)
    description = models.TextField(max_length=1000)
    sex_choices = [
        ('men', 'men'),
        ('women', 'women'),
        ('unisex', 'unisex')
    ]
    sex = models.CharField(max_length=20, choices=sex_choices, default='unisex')
    xs = models.BooleanField(default=True)
    s = models.BooleanField(default=True)
    m = models.BooleanField(default=True)
    l = models.BooleanField(default=True)
    xl = models.BooleanField(default=True)
    xxl = models.BooleanField(default=True)
    xxxl = models.BooleanField(default=True)
    xxxxl = models.BooleanField(default=True)
    xxxxxl = models.BooleanField(default=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name="Product"
        verbose_name_plural="Products"
    
class ProductPhotos(models.Model):
    product = models.ForeignKey(Products, default=None, on_delete=models.CASCADE)
    photo = models.FileField(blank=True)

    def __str__(self) -> str:
        return self.product.name

def product_pre_save(sender, instance, *args, **kwargs):
    if instance.slug is None:
        slugify_instance_name(instance, save=False)

pre_save.connect(product_pre_save, sender=Products)


def product_post_save(sender, instance, created, *args, **kwargs):
    if created:
        slugify_instance_name(instance, save=True)

post_save.connect(product_post_save, sender=Products)

class Orders(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zipcode = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    local = models.CharField(max_length=50)
    info = models.TextField(max_length=500)
    sum = models.DecimalField(max_digits=8, decimal_places=2)
    delivery = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.last_name + " - " + str(self.date)

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

class OrderItems(models.Model):
    product = models.ForeignKey(Products, on_delete=models.SET_NULL, null=True, blank=True)
    order = models.ForeignKey(Orders, on_delete=models.CASCADE, null=True, blank=True)
    size = models.CharField(max_length=20)
    amount = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Order Item'
        verbose_name_plural = 'Order Items'