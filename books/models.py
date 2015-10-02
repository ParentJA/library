__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Author(models.Model):
    pass


class Book(models.Model):
    authors = models.ManyToManyField(
        'books.Author',
        through='books.BookAuthor',
        through_fields=('book', 'author'),
        related_name='books'
    )
    categories = models.ManyToManyField(
        'books.Category',
        through='books.BookCategory',
        through_fields=('book', 'category'),
        related_name='books'
    )


class BookAuthor(models.Model):
    book = models.ForeignKey('books.Book', related_name='book_authors')
    author = models.ForeignKey('books.Author', related_name='book_authors')


class BookCategory(models.Model):
    book = models.ForeignKey('books.Book', related_name='book_categories')
    category = models.ForeignKey('books.Category', related_name='book_categories')

    class Meta:
        verbose_name_plural = 'book categories'


class Category(models.Model):
    class Meta:
        verbose_name_plural = 'categories'


class Library(models.Model):
    addresses = models.ManyToManyField(
        'core.Address',
        through='books.LibraryAddress',
        through_fields=('library', 'address'),
        related_name='libraries'
    )
    books = models.ManyToManyField(
        'books.Book',
        through='books.LibraryBook',
        through_fields=('library', 'book'),
        related_name='libraries'
    )

    class Meta:
        verbose_name_plural = 'libraries'


class LibraryAddress(models.Model):
    library = models.ForeignKey('books.Library', related_name='library_addresses')
    address = models.ForeignKey('core.Address', related_name='library_addresses')

    class Meta:
        verbose_name_plural = 'library addresses'


class LibraryBook(models.Model):
    library = models.ForeignKey('books.Library', related_name='library_books')
    book = models.ForeignKey('books.Book', related_name='library_books')
