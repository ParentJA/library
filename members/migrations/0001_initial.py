# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='MemberAddress',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('address', models.ForeignKey(related_name='member_addresses', to='core.Address')),
                ('member', models.ForeignKey(related_name='member_addresses', to='members.Member')),
            ],
        ),
        migrations.CreateModel(
            name='MemberRequest',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('book', models.ForeignKey(related_name='member_requests', to='books.Book')),
                ('member', models.ForeignKey(related_name='member_requests', to='members.Member')),
            ],
        ),
        migrations.AddField(
            model_name='member',
            name='addresses',
            field=models.ManyToManyField(related_name='members', through='members.MemberAddress', to='core.Address'),
        ),
        migrations.AddField(
            model_name='member',
            name='requests',
            field=models.ManyToManyField(related_name='members', through='members.MemberRequest', to='books.Book'),
        ),
    ]
