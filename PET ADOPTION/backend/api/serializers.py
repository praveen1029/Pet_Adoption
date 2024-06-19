from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
import random
import string
from django.core.mail import send_mail
import re

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'contact', 'address', 'is_donor', 'image')
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
            },
            'image': {
                'required': False, 
                'allow_null': True
            }
        }

    def create(self, validated_data):
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
            address = validated_data['address'],
            image = validated_data.get('image', 'images/man.jpg'),
            is_donor = validated_data['is_donor']
        )
        user.set_password(random_password)
        user.save()

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
        exclude = ['user']
        extra_kwargs = {
            'description': {
                'error_messages': {
                    'blank': 'Please provide your pets description.'
                }
            },
            'remark': {
                'required': False, 
                'allow_null': True
            },
            'image': {
                'error_messages': {
                    'blank': 'Please provide your pets image.'
                }
            }
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'contact', 'address', 'image', 'is_donor']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'contact', 'address', 'image']

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
            },
            'image': {
                'required': False, 
                'allow_null': True
            }
        }

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.contact = validated_data.get('contact', instance.contact)
        instance.address = validated_data.get('address', instance.address)
        if 'image' in validated_data:
            instance.image = validated_data['image']
        
        instance.save()
        return instance
    
class ChangePasswordSerializer(serializers.Serializer):
    current = serializers.CharField(required=True)
    passw = serializers.CharField(required=True)
    cpassw = serializers.CharField(required=True)

    def validate(self, data):
        if data['passw'] != data['cpassw']:
            raise serializers.ValidationError("New password and Csonfirm password do not match.")
        password = data['passw']
        if len(password) < 8:
            raise serializers.ValidationError("New password must be at least 8 characters long.")
        if not re.search(r'\d', password):
            raise serializers.ValidationError("New password must contain at least one digit.")
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError("New password must contain at least one small letter.")
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError("New password must contain at least one capital letter.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise serializers.ValidationError("New password must contain at least one special character.")

        return data