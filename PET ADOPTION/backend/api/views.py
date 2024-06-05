from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework import generics


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(APIView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(email=serializer.data['email'], password=serializer.data['password'])
        if user is not None:
            login(request, user)
            user = User.objects.get(email=serializer.data['email'])
            return Response({"is_donor": user.is_donor, "id":user.id}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterPet(generics.CreateAPIView):
    queryset = PetDetails.objects.all()
    serializer_class = PetRegisterSerializer

class ListPets(generics.ListAPIView):
    queryset = PetDetails.objects.all()
    serializer_class = PetSerializer