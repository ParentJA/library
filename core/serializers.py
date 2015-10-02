__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id',)
