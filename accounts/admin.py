__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAddressAdmin(admin.TabularInline):
    model = User.addresses.through
    extra = 1


class UserRequestAdmin(admin.TabularInline):
    model = User.requests.through
    extra = 1


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = (UserAddressAdmin, UserRequestAdmin)
