# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='BookAuthor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('author', models.ForeignKey(related_name='book_authors', to='books.Author')),
                ('book', models.ForeignKey(related_name='book_authors', to='books.Book')),
            ],
        ),
        migrations.CreateModel(
            name='BookCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('book', models.ForeignKey(related_name='book_categories', to='books.Book')),
            ],
            options={
                'verbose_name_plural': 'book categories',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Library',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
                'verbose_name_plural': 'libraries',
            },
        ),
        migrations.CreateModel(
            name='LibraryAddress',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('address', models.ForeignKey(related_name='library_addresses', to='core.Address')),
                ('library', models.ForeignKey(related_name='library_addresses', to='books.Library')),
            ],
            options={
                'verbose_name_plural': 'library addresses',
            },
        ),
        migrations.CreateModel(
            name='LibraryBook',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('book', models.ForeignKey(related_name='library_books', to='books.Book')),
                ('library', models.ForeignKey(related_name='library_books', to='books.Library')),
            ],
        ),
        migrations.AddField(
            model_name='library',
            name='addresses',
            field=models.ManyToManyField(related_name='libraries', through='books.LibraryAddress', to='core.Address'),
        ),
        migrations.AddField(
            model_name='library',
            name='books',
            field=models.ManyToManyField(related_name='libraries', through='books.LibraryBook', to='books.Book'),
        ),
        migrations.AddField(
            model_name='bookcategory',
            name='category',
            field=models.ForeignKey(related_name='book_categories', to='books.Category'),
        ),
        migrations.AddField(
            model_name='book',
            name='authors',
            field=models.ManyToManyField(related_name='books', through='books.BookAuthor', to='books.Author'),
        ),
        migrations.AddField(
            model_name='book',
            name='categories',
            field=models.ManyToManyField(related_name='books', through='books.BookCategory', to='books.Category'),
        ),
    ]
