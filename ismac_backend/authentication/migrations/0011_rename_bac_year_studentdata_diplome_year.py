# Generated by Django 5.0.4 on 2024-11-14 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0010_studentdata_is_master'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentdata',
            old_name='bac_year',
            new_name='diplome_year',
        ),
    ]
