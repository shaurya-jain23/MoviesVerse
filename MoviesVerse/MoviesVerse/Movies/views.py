from django.shortcuts import render
from .models import Movie

def home(request):
    context = {
        'Movies': Movie.objects.all()
    }
    return render(request, 'Movies/home.html', context)

# Create your views here.
