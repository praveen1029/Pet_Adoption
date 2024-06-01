from django.shortcuts import render
from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.views import APIView

# Create your views here.
class CustomerView(APIView):
    def get(self, request):
        output = [{
            'name': output.name,
            'age': output.age
        } for output in Customer.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)