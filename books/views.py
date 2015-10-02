__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import status, views
from rest_framework.response import Response

# Local imports...
from .models import Author, Book, Category, Library
from .serializers import AuthorSerializer, BookSerializer, CategorySerializer, LibrarySerializer


class AuthorAPIView(views.APIView):
    def get(self, request):
        authors = Author.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'authors': AuthorSerializer(authors, many=True).data
        })


class BookAPIView(views.APIView):
    def get(self, request):
        books = Book.objects.prefetch_related('authors', 'categories')

        return Response(status=status.HTTP_200_OK, data={
            'books': BookSerializer(books, many=True).data
        })


class CategoryAPIView(views.APIView):
    def get(self, request):
        categories = Category.objects.all()

        return Response(status=status.HTTP_200_OK, data={
            'categories': CategorySerializer(categories, many=True).data
        })


class LibraryAPIView(views.APIView):
    def get(self, request):
        libraries = Library.objects.prefetch_related('books')

        return Response(status=status.HTTP_200_OK, data={
            'libraries': LibrarySerializer(libraries, many=True).data
        })
