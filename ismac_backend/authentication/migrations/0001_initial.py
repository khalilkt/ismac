# Generated by Django 5.0.4 on 2024-07-07 22:24

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StudentData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('cin', models.CharField(max_length=255)),
                ('cin_file', models.FileField(blank=True, null=True, upload_to='')),
                ('nationality', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('date_of_birth', models.DateField()),
                ('phone', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('codeMassar', models.CharField(max_length=255)),
                ('bac_type', models.CharField(max_length=255)),
                ('bac_year', models.CharField(max_length=255)),
                ('bac_note', models.CharField(max_length=255)),
                ('condidatureFile', models.FileField(blank=True, null=True, upload_to='')),
                ('departement', models.CharField(max_length=255)),
                ('filiere', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]