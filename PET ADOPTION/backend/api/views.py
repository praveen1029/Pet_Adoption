from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
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
        is_superuser = UserSerializer(user).data['is_superuser']
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({'access_token': str(refresh.access_token),'refresh_token': str(refresh),"is_donor": is_donor, "is_superuser": is_superuser}, status=status.HTTP_200_OK)
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

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['current']):
                return Response({"non_field_errors": ["Current password is Wrong."]}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data['passw'])
            user.save()
            return Response({"detail": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ValidateTokenView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response({"detail": "Token is valid."}, status=status.HTTP_200_OK)
    
class AdoptPet(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ListMyDonations(generics.ListAPIView):
    serializer_class = PetSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return PetDetails.objects.filter(user = user)
    
class AdoptPet(generics.UpdateAPIView):
    queryset = AdoptionDetails.objects.all()
    serializer_class = AdoptSerializer

    def update(self, request, *args, **kwargs):
        pet_id = self.kwargs.get('pk')
        pet = PetDetails.objects.get(pk=pet_id)

        # Create or get the adopted instance
        adopted, created = AdoptionDetails.objects.get_or_create(pet=pet, user=request.user)

        # Update the adoption status
        serializer = self.get_serializer(adopted, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GetPetDetails(generics.RetrieveAPIView):
    queryset = PetDetails.objects.all()
    serializer_class = PetSerializer
    lookup_url_kwarg = 'pet_id'

    def retrieve(self, request, *args, **kwargs):
        pet_id = self.kwargs.get(self.lookup_url_kwarg)
        try:
            pet = self.queryset.get(id=pet_id)
            serializer = self.serializer_class(pet)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except PetDetails.DoesNotExist:
            return Response({"detail": f"Pet with id {pet_id} does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
class ListMyAdoptions(generics.ListAPIView):
    serializer_class = AdoptedSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return AdoptionDetails.objects.filter(user = user)
    
class DonorListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_donor=True, is_superuser=False)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_donor=False, is_superuser=False)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class AdoptionDetails(generics.ListAPIView):
    queryset = AdoptionDetails.objects.filter(is_approved=False)
    serializer_class = AdoptionDetailserializer
    permission_classes = [permissions.IsAuthenticated]