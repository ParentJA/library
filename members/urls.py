__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import MemberAPIView

urlpatterns = [
    url(r'^$', MemberAPIView.as_view()),
]
