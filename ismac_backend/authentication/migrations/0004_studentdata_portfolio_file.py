# Generated by Django 5.0.4 on 2024-07-12 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_user_created_at_user_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentdata',
            name='portfolio_file',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]
