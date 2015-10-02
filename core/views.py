__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Address
from .serializers import AddressSerializer


class AddressAPIView(views.APIView):
    def get(self, request):
        addresses = Address.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'addresses': AddressSerializer(addresses, many=True).data
        })
