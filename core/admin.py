__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    pass
