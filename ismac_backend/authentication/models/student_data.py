from django.db import models
from rest_framework import serializers
from django.db import models
from rest_framework import serializers


class StudentData(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='student_data')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cin = models.CharField(max_length=255)
    nationality = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    profile_picture = models.FileField(null=True, blank=True)

    is_foreign_bac = models.BooleanField()
    codeMassar = models.CharField(max_length=255)
    bac_type = models.CharField(max_length=255)
    bac_year = models.CharField(max_length=255)
    bac_note = models.CharField(max_length=255)
    condidatureFile = models.FileField(null=True, blank=True)

    departement = models.CharField(max_length=255)
    filiere = models.CharField(max_length=255)

    portfolio_file = models.FileField(null=True, blank=True)

    is_accepted = models.BooleanField(null=True, blank=True, default=None)

class StudentDataSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField( read_only=True, source="user.created_at")
    email = serializers.EmailField(read_only=True, source="user.email")

    class Meta:
        model = StudentData
        fields = '__all__'
        read_only_fields = ['user']