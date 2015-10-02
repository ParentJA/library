__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.conf.urls import url

# Local imports...
from .views import AuthorAPIView, BookAPIView, CategoryAPIView, LibraryAPIView

urlpatterns = [
    url(r'^library/$', LibraryAPIView.as_view()),
    url(r'^$', BookAPIView.as_view()),
    url(r'^author/$', AuthorAPIView.as_view()),
    url(r'^category/$', CategoryAPIView.as_view()),
]
