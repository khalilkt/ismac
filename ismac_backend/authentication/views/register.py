import random
from rest_framework.generics import CreateAPIView, ListCreateAPIView, ListAPIView
from authentication.models import UserSerializer , User, StudentDataSerializer
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from authentication.models import StudentData
from django.db import transaction
from rest_framework.views import APIView, Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags



class SendMailView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        user = User.objects.first()
        student_data = StudentData.objects.get(user=user)
        if not student_data:
            return Response({"message" : "No student data found"})
        send_user_register_email(user = user, student_data = student_data, password="1234")
        return Response({"message" : "Email sent"})

def send_user_register_email(user : User, student_data : StudentData,  password):
    subject = "Inscription au concours ISMAC"
    context = {
        "first_name" : student_data.first_name,
        "last_name" : student_data.last_name,
        "password" : password,
        "email" : user.email,
        "created_at" : user.created_at,
        "year" : "2024/2025"
    }

    html_message = render_to_string("register_email.html", context = context)
    plain_message  = strip_tags(html_message)

    message = EmailMultiAlternatives(
        subject=subject,
        body=plain_message,
        from_email=None,
        to= [user.email ]
    )

    message.attach_alternative(html_message, "text/html")
    message.send()

class RegisterSerializer(serializers.ModelSerializer):
    student_data = StudentDataSerializer(write_only=True, required=True)
    class Meta:
        model = User
        exclude = ["password"]   

    def generate_password(self, first_name, last_name):
        random_number = random.randint(1000, 9999)
        return first_name + "_" + last_name + "_" + str(random_number)

    def create(self, validated_data):
        student_data = validated_data.pop('student_data')
        password = self.generate_password(student_data.get('first_name'), student_data.get('last_name'))
        with transaction.atomic():
            user = User.objects.create_user(**validated_data, password=password)
            student_data = StudentData.objects.create(user=user, **student_data)

        send_user_register_email(user, student_data, password)
        return user
        

class StudentRegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

class StudentFilesUpload(APIView):
    permission_classes = [AllowAny]
    def post(self, request, id):
        user = User.objects.get(id=id)
        if not user:
            return Response({"message" : "User not found"})
        student_data = StudentData.objects.get(user=user)
        if not student_data:
            return Response({"message" : "Student data not found"})
        cin_file = request.FILES.get('cin_file')
        condidatureFile = request.FILES.get('condidatureFile')
        profile_picture = request.FILES.get('profile_picture')
        portfolio_file = request.FILES.get('portfolio_file')

        if cin_file and not student_data.cin_file:
            student_data.cin_file = cin_file
            student_data.save()
        if condidatureFile and not student_data.condidatureFile:
            student_data.condidatureFile = condidatureFile
            student_data.save()
        if profile_picture and not student_data.profile_picture:
            student_data.profile_picture = profile_picture
            student_data.save()
        if portfolio_file and not student_data.portfolio_file:
            student_data.portfolio_file = portfolio_file
            student_data.save()
        return Response({"message" : "Files uploaded"})
        

class StudentListView(ListAPIView):
    
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


    