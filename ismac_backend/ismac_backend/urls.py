"""
URL configuration for ismac_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework import routers
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from authentication.views import *

router = routers.DefaultRouter()


urlpatterns = [
    path('auth/token/', LoginTokenView.as_view(), name="login-token"),
    path('auth/login/', LoginView.as_view(), name="login"),
    # path("send_mail/", SendMailView.as_view(), name="send_mail"),
    path("register/", StudentRegisterView.as_view(), name="register"),
    path("students/<int:id>/files/", StudentFilesUpload.as_view(), name="student_files"),
    path("students/", StudentListView.as_view(), name="students"),
    path("students/accept/", BulkAcceptStudents.as_view(), name="accept_students"),
    path("students/reset/", BulkResetStudents.as_view(), name="reject_students"),
    path("students/data/", students_data, name="students_data"),
]

urlpatterns += static("" +  settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += router.urls