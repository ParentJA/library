__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Member
from .serializers import MemberSerializer


class MemberAPIView(views.APIView):
    def get(self, request):
        members = Member.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'members': MemberSerializer(members, many=True).data
        })
