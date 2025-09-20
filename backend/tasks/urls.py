from django.urls import path, include
from .views import RegisterView
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

# The API URLs are now determined automatically by the router.
urlpatterns = router.urls

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
] + router.urls