# Generated by Django 5.0.4 on 2024-11-13 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_studentdata_is_foreign_bac'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentdata',
            name='is_master',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]