from django.contrib import admin

from api.models import *

admin.site.register(Categories)
admin.site.register(Collections)
admin.site.register(Deliveries)
admin.site.register(Newsletter)
admin.site.register(Messages)

class ProductPhotosAdmin(admin.StackedInline):
    model = ProductPhotos

@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    inlines = [ProductPhotosAdmin]

    class Meta:
        model = Products

class OrderItemsAdmin(admin.StackedInline):
    model = OrderItems


@admin.register(Orders)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemsAdmin]

    class Meta:
        model = Orders