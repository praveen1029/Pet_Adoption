from django.urls import re_path
from .views import RegisterView, LoginView

urlpatterns = [
    re_path('register/', RegisterView.as_view(), name='register'),
    re_path('login/', LoginView.as_view(), name='login'),
]
