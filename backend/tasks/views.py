from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, filters
from .models import Task
from .serializers import TaskSerializer, RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['completed', 'priority', 'due_date']
    search_fields = ['title', 'description']
    ordering_fields = ['due_date', 'priority']
    """
    A viewset for viewing and editing task instances.
    """
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        This view should return a list of all the tasks
        for the currently authenticated user.
        """
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Assign the logged-in user to the task when it is created.
        """
        serializer.save(user=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

