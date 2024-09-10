
from django.contrib import admin
from django.urls import path
from .views import predict_phone
urlpatterns = [
    path('api/', predict_phone,name="predict_phone"),
]
