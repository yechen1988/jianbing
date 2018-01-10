from django.shortcuts import render
from jbadmin.models import Users,Item,Category
import json
from django.http import HttpResponse
from django.db.models import Q  


def index(request):
    response=render(request,"index.html",{});
    return response


    
    
