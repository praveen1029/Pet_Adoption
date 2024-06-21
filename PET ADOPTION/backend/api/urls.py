from django.urls import re_path, path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'register/', RegisterView.as_view(), name='register'),
    re_path(r'login/', LoginView.as_view(), name='login'),
    re_path(r'register_pet/', RegisterPet.as_view(), name='register_pet'),
    re_path(r'list_pet/', ListPets.as_view(), name='list_pet'),
    re_path(r'get_user/', GetUser.as_view(), name='get_user'),
    re_path(r'update_user/', UpdateUser.as_view(), name='update_user'),
    re_path(r'change_password/', ChangePasswordView.as_view(), name='change_password'),
    re_path(r'validate_token/', ValidateTokenView.as_view(), name='validate_token'),
    re_path(r'my_donations/', ListMyDonations.as_view(), name='my_donations'),
    re_path(r'my_adoptions/', ListMyAdoptions.as_view(), name='my_adoptions'),
    path('adopt/<int:pk>', AdoptPet.as_view(), name='adopt-pet'),
    path('pets/<int:pet_id>/', GetPetDetails.as_view(), name='pet-detail'),
]
