import os
import json
from django.http import JsonResponse
from django.shortcuts import render
from django.conf import settings
from django.templatetags.static import static

def home(request):
    return render(request, 'core/home.html')

def chart1_view(request):
    return render(request, 'core/chart1.html')

def chart2_view(request):
    return render(request, 'core/chart2.html')

def chart3_view(request):
    return render(request, 'core/chart3.html')

def sales_data(request):
    json_file_path = os.path.join(settings.BASE_DIR, 'core', 'static', 'data', 'salesData.json')
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    return JsonResponse(data)
