# Generated by Django 5.0.4 on 2024-07-17 18:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_alter_studentdata_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentdata',
            name='cin_file',
        ),
    ]
