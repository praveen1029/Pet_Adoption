from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import *
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken


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
        is_donor = UserSerializer(user).data['is_donor']
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'access_token': str(refresh.access_token),'refresh_token': str(refresh),"is_donor": is_donor}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
class RegisterPet(generics.CreateAPIView):
    serializer_class = PetRegisterSerializer
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListPets(generics.ListAPIView):
    queryset = PetDetails.objects.filter(is_adopted = False)
    serializer_class = PetSerializer

class GetUser(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
class UpdateUser(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserUpdateSerializer

    def get_object(self):
        return self.request.user