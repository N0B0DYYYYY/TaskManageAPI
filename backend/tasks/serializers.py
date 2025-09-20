from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        field = ['id', 'title', 'description', 'due_date', 'priority', 'completed', 'user',]
        read_only_fields = ['id', 'user',]

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)   
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        email = validated_data.get('email', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=email,
        )
        return user
