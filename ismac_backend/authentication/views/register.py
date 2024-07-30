import random
import string
from rest_framework.generics import CreateAPIView, ListCreateAPIView, ListAPIView, DestroyAPIView
from authentication.models import UserSerializer , User, StudentDataSerializer
from rest_framework.permissions import AllowAny
from rest_framework import serializers
from authentication.models import StudentData
from django.db import transaction
from rest_framework.views import APIView, Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
import xlwt
from django.http import HttpResponse
from django.utils import timezone




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
        student_data.pop('is_accepted', None)
        password = self.generate_password(student_data.get('first_name'), student_data.get('last_name'))
        print(password)
        # aksmd_mkamsdk_8540
        # adamsdma@gmail.com
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
        condidatureFile = request.FILES.get('condidatureFile')
        profile_picture = request.FILES.get('profile_picture')
        portfolio_file = request.FILES.get('portfolio_file')

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
    serializer_class = StudentDataSerializer
    permission_classes = [IsAdminUser]
    search_fields = ['first_name', 'last_name', 'cin',  "codeMassar", "user__email"]
    required_query_params = {
        "type" : ["oral", "ecrit"],
    }
    ordering = ['user__created_at']
    
    def get(self, request, *args, **kwargs):
        for key in self.required_query_params:
            if key not in request.query_params:
                return Response({"message" : f"{key} is required"})
            if request.query_params[key] not in self.required_query_params[key]:
                return Response({"message" : f"{key} must be in {self.required_query_params[key]}"})
        return super().get(request, *args, **kwargs)
    
    def filter_queryset(self, queryset):
        type = self.request.query_params.get('type')
        if type == "oral":
            queryset = queryset.filter(is_accepted=True)
        # elif type == "ecrit":
            # queryset = queryset
        ret =  super().filter_queryset(queryset)
        return ret
    def get_queryset(self):
        # students = StudentData.objects.filter(user__is_admin=False)
        # for student in students:
        #     code_massar = random.choice(string.ascii_uppercase) + ''.join(random.choices(string.digits, k=9))
        #     student.codeMassar = code_massar
        #     student.save()
        return StudentData.objects.filter(user__is_admin=False)
    
class StudentDeleteView(DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = StudentData.objects.all()
    def delete(self, request, *args, **kwargs):
        studentData = self.get_object()
        user = studentData.user
        user.delete()
        return Response({"message" : "Student deleted"})
    

class BulkAcceptStudents(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):

        students = request.data.get('students')
        students = [id.strip().lower() for id in students]
        for student in StudentData.objects.filter(user__is_admin=False):
            student.codeMassar = student.codeMassar.lower()
            student.save()
        
        
        if not students:
            return Response({"message" : "students not found"})
        StudentData.objects.filter(user__is_admin=False).exclude(codeMassar__in=students).update(is_accepted=False)
        StudentData.objects.filter(user__is_admin=False).filter(codeMassar__in=students).update(is_accepted=True)
        
        return Response({"message" : "Students accepted"})
    
class BulkResetStudents(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        StudentData.objects.filter(user__is_admin=False).update(is_accepted=None)
        return Response({"message" : "Students reset"})
    

def format_datetime(date):
    return date.strftime("%Y-%m-%d %H:%M:%S")

def students_data(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="Liste des etudiants.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Liste des étudiants')
    row_num = 0
    font_style = xlwt.XFStyle()
    font_style.font.bold = True
    columns = ['Nom', 'Prénom', 'CIN', 'Nationalité', 'Ville', 'Date de naissance', 'Téléphone', 'Adresse', 'Code Massar', 'Type de bac', 'Année de bac', 'Note de bac', 'Département', 'Filière', "email", "Date d'inscription"]
    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)
    font_style = xlwt.XFStyle()
    students = StudentData.objects.filter(user__is_admin=False)
    for student in students:
        row_num += 1
        ws.write(row_num, 0, student.first_name, font_style)
        ws.write(row_num, 1, student.last_name, font_style)
        ws.write(row_num, 2, student.cin, font_style)
        ws.write(row_num, 3, student.nationality, font_style)
        ws.write(row_num, 4, student.city, font_style)
        ws.write(row_num, 5, student.date_of_birth, font_style)
        ws.write(row_num, 6, student.phone, font_style)
        ws.write(row_num, 7, student.address, font_style)
        ws.write(row_num, 8, student.codeMassar, font_style)
        ws.write(row_num, 9, student.bac_type, font_style)
        ws.write(row_num, 10, student.bac_year, font_style)
        ws.write(row_num, 11, student.bac_note, font_style)
        ws.write(row_num, 12, student.departement, font_style)
        ws.write(row_num, 13, student.filiere, font_style)
        ws.write(row_num, 14, student.user.email, font_style)
        ws.write(row_num, 15, format_datetime(student.user.created_at), font_style)
    wb.save(response)
    return response

