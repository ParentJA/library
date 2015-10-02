__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from rest_framework import serializers

# Local imports...
from .models import Author, Book, Category, Library


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id',)


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id',)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id',)


class LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Library
        fields = ('id',)
