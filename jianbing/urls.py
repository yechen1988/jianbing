"""jianbing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from jbadmin import views as jbadmin_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',jbadmin_views.index),
    path('index/',jbadmin_views.index),
    path('login/',jbadmin_views.login),
    path('regist/',jbadmin_views.regist),
    
    path('categorys/',jbadmin_views.getCategoryPage),#获取分类列表
    path('getCategorys/',jbadmin_views.getCategorys),#获取分类列表
    path('editCategory/',jbadmin_views.editCategory),#编辑分类
    path('delCategory/',jbadmin_views.delCategory),
    
    path('getItems/',jbadmin_views.getItems),#获取商品列表
    path('items/',jbadmin_views.getItemsPage),#跳转   
    path('editItem/',jbadmin_views.editItem),#商品编辑添加
    path('admin/', admin.site.urls),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
