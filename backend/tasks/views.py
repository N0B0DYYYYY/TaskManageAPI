# taskmanager/tasks/views.py

from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, filters
from .models import Task
from .serializers import TaskSerializer, RegisterSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import AllowAny
from .permissions import IsOwner
from django_filters.rest_framework import DjangoFilterBackend


class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class TaskViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority', 'deadline']
    search_fields = ['title', 'description']
    ordering_fields = ['deadline', 'priority']
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Add this line
