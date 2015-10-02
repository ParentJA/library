__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Author, Book, Category, Library


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    pass


class BookAuthorAdmin(admin.TabularInline):
    model = Book.authors.through
    extra = 1


class BookCategoryAdmin(admin.TabularInline):
    model = Book.categories.through
    extra = 1


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    inlines = (BookAuthorAdmin, BookCategoryAdmin)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


class LibraryAddressAdmin(admin.TabularInline):
    model = Library.addresses.through
    extra = 1


class LibraryBookAdmin(admin.TabularInline):
    model = Library.books.through
    extra = 1


@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    inlines = (LibraryAddressAdmin, LibraryBookAdmin)
