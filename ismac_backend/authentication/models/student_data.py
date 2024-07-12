from django.db import models
from rest_framework import serializers
from django.db import models
from rest_framework import serializers


class StudentData(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='student_data')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    cin = models.CharField(max_length=255)
    cin_file = models.FileField(null=True, blank=True)
    nationality = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    phone = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    profile_picture = models.FileField(null=True, blank=True)

    codeMassar = models.CharField(max_length=255)
    bac_type = models.CharField(max_length=255)
    bac_year = models.CharField(max_length=255)
    bac_note = models.CharField(max_length=255)
    condidatureFile = models.FileField(null=True, blank=True)

    departement = models.CharField(max_length=255)
    filiere = models.CharField(max_length=255)

    portfolio_file = models.FileField(null=True, blank=True)

class StudentDataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StudentData
        fields = '__all__'
        read_only_fields = ['user']