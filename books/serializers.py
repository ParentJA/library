__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Author, Book, Category, Library


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'first_name', 'last_name')


class BookSerializer(serializers.ModelSerializer):
    is_available = serializers.BooleanField()

    class Meta:
        model = Book
        fields = ('id', 'title', 'publication_date', 'authors', 'categories', 'is_available')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ('id', 'name', 'addresses', 'books')
