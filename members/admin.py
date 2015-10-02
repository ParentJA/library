__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.contrib import admin

# Local imports...
from .models import Member


class MemberAddressAdmin(admin.TabularInline):
    model = Member.addresses.through
    extra = 1


class MemberRequestAdmin(admin.TabularInline):
    model = Member.requests.through
    extra = 1


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    inlines = (MemberAddressAdmin, MemberRequestAdmin)
