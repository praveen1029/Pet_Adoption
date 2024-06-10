from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
import random
import string
from django.core.mail import send_mail

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'contact', 'address', 'is_donor')
        extra_kwargs = {
            'email': {
                'error_messages': {
                    'blank': 'Email cannot be blank'
                }
            },
            'first_name': {
                'error_messages': {
                    'blank': 'First name cannot be blank'
                }
            },
            'last_name': {
                'error_messages': {
                    'blank': 'Last name cannot be blank'
                }
            },
            'contact': {
                'error_messages': {
                    'blank': 'Phone Number cannot be blank'
                }
            },
            'address': {
                'error_messages': {
                    'blank': 'Address cannot be blank'
                }
            }
        }

    def create(self, validated_data):
        # Generate a random 6-digit password
        random_password = ''.join(random.choices(string.digits, k=6))

        send_mail(
            'Login Credentials',
            f'''Hi {validated_data["first_name"]} {validated_data["last_name"]},\n{"Thank you for registering as a donar in AdoptPet." if validated_data["is_donor"] else "Thank you for choosing our platform to adopt a pet."} \nYour temporary password is {random_password}''',
            'altostechnologies6@gmail.com',  # Replace with your from email
            [validated_data['email']],
            fail_silently=False,
        )

        # Create the user
        user = User.objects.create(
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            contact = validated_data['contact'],
            is_donor = validated_data['is_donor']
        )
        user.set_password(random_password)
        user.save()

        # Send the password via emai

        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetDetails
        fields = '__all__'

class PetRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetDetails
        exclude = ['remark', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'contact')