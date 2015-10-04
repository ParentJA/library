__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Third-party imports...
from localflavor.us.models import PhoneNumberField

# Django imports...
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    photo = models.ImageField(upload_to='photos', default='photos/no-image.jpg', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)
    addresses = models.ManyToManyField(
        'core.Address',
        through='accounts.UserAddress',
        through_fields=('user', 'address'),
        related_name='users'
    )
    requests = models.ManyToManyField(
        'books.Book',
        through='accounts.UserRequest',
        through_fields=('user', 'book'),
        related_name='users'
    )

    def __unicode__(self):
        return self.get_full_name()

    @property
    def photo_url(self):
        try:
            return self.photo.url
        except ValueError:
            return None


class UserAddress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_addresses')
    address = models.ForeignKey('core.Address', related_name='user_addresses')


class UserRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='user_requests')
    book = models.ForeignKey('books.Book', related_name='user_requests')
