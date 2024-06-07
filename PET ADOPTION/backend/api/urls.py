from django.urls import re_path
from .views import *

urlpatterns = [
    re_path(r'register/', RegisterView.as_view(), name='register'),
    re_path(r'login/', LoginView.as_view(), name='login'),
    re_path(r'register_pet/', RegisterPet.as_view(), name='register_pet'),
    re_path(r'list_pet/', ListPets.as_view(), name='list_pet'),
    re_path(r'get_user/', GetUser.as_view(), name='get_user'),
    re_path(r'update_user/', UpdateUser.as_view(), name='update_user'),
]
