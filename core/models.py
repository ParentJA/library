__author__ = 'jason.a.parent@gmail.com (Jason Parent)'

# Django imports...
from django.db import models


class Address(models.Model):
    class Meta:
        verbose_name_plural = 'addresses'
