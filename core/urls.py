__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import AddressAPIView

urlpatterns = [
    url(r'^address/$', AddressAPIView.as_view()),
]
