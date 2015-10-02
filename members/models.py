__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Member(models.Model):
    addresses = models.ManyToManyField(
        'core.Address',
        through='members.MemberAddress',
        through_fields=('member', 'address'),
        related_name='members'
    )
    requests = models.ManyToManyField(
        'books.Book',
        through='members.MemberRequest',
        through_fields=('member', 'book'),
        related_name='members'
    )


class MemberAddress(models.Model):
    member = models.ForeignKey('members.Member', related_name='member_addresses')
    address = models.ForeignKey('core.Address', related_name='member_addresses')


class MemberRequest(models.Model):
    member = models.ForeignKey('members.Member', related_name='member_requests')
    book = models.ForeignKey('books.Book', related_name='member_requests')
