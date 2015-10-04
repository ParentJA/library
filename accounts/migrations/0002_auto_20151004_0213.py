# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_auto_20151002_1711'),
        ('core', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('address', models.ForeignKey(related_name='user_addresses', to='core.Address')),
                ('user', models.ForeignKey(related_name='user_addresses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('book', models.ForeignKey(related_name='user_requests', to='books.Book')),
                ('user', models.ForeignKey(related_name='user_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='addresses',
            field=models.ManyToManyField(related_name='users', through='accounts.UserAddress', to='core.Address'),
        ),
        migrations.AddField(
            model_name='user',
            name='requests',
            field=models.ManyToManyField(related_name='users', through='accounts.UserRequest', to='books.Book'),
        ),
    ]
