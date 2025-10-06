# taskmanager/tasks/urls.py

from django.urls import path, include
from .views import RegisterView
from .views import RegisterView, UserProfileView 
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    path('', include(router.urls)),
    
]