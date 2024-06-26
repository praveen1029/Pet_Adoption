from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, contact=None, address=None, password=None, is_donor=False):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            contact=contact,
            address=address,
            is_donor=is_donor
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, first_name='', last_name=''):
        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            contact=None,
            address=None,
            is_donor=False
        )
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    contact = models.CharField(max_length=30, null=True)
    address = models.TextField(null=True)
    is_donor = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)  
    image = models.ImageField(null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class PetDetails(models.Model):
    category = models.CharField(max_length=50)
    description = models.CharField(max_length=1000)
    remark = models.CharField(max_length=500, blank=True)
    image = models.ImageField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_adopted = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True, null=True)

class AdoptionDetails(models.Model):
    pet = models.ForeignKey(PetDetails, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True, null=True)
    is_approved = models.BooleanField(default=False)