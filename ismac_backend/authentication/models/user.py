from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from rest_framework import serializers

from authentication.models.student_data import StudentData, StudentDataSerializer
from django.db import transaction

class UserManager(BaseUserManager):
    def create_user(self, email, name, password):
        if not email:
            raise ValueError("User must have an email")
        if not name:
            raise ValueError("User must have a name")
        user = self.model(
            email=self.normalize_email(email),
            name=name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email,name, password):
        user = self.create_user(email=email, name = name,  password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def get_queryset(self):
        ret = super().get_queryset()
        return ret
    
class User(AbstractBaseUser): 
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    REQUIRED_FIELDS = ['name']
    USERNAME_FIELD = 'email'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    @property
    def is_staff(self):
        return self.is_admin or self.is_superuser



class UserSerializer(serializers.ModelSerializer): 
    student_data = serializers.SerializerMethodField()
    

    def get_student_data(self, user):
        student_data = StudentData.objects.filter(user=user).first()
        if student_data is not None:
            return StudentDataSerializer(student_data).data
        return None

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_admin = validated_data.get('is_admin', False)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        # instance.username = validated_data.get('username', instance.username)   
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        if "password" in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance

    class Meta:
        model = User
        fields = "__all__" 
        extra_kwargs = {'password': {'write_only': True}} 




