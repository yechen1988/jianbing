from django.db import models

# Create your models here.
class Users(models.Model):
    #鍛樺伐
    uid = models.AutoField(primary_key=True,)
    uname = models.CharField(max_length=100)
    level_id = models.IntegerField()
    password = models.CharField(max_length=32)

class Shop(models.Model):
    #鍒嗗簵閾�
    sid = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=100)
    item_ids = models.CharField(max_length=5000)
    address = models.CharField(max_length=200)
    level = models.CharField(max_length=30)

class Level(models.Model):
    #鏉冮檺绛夌骇
    lid = models.AutoField(primary_key=True)
    lname = models.CharField(max_length=100)
    permissions = models.CharField(max_length=5000)

class Item(models.Model):
    #璐у搧
    iid = models.AutoField(primary_key=True)
    iname = models.CharField(max_length=100)
    price = models.FloatField()
    category_id = models.IntegerField()  #CategoryID
    picture = models.ImageField(upload_to='jianbing/itempic')

class Category(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=100)
    cdepend_id = models.IntegerField(default=0)
    
class Combo(models.Model):
    #濂楅
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=100)
    cprice = models.FloatField()
    item_ids = models.CharField(max_length=100)
    picture = models.FilePathField()

class ShoppingList(models.Model):
    #璐墿娓呭崟
    slid = models.AutoField(primary_key=True)
    customer_id = models.IntegerField()
    shop_id = models.IntegerField()
    combo_ids = models.CharField(max_length=300)
    item_ids = models.CharField(max_length=300)
    date = models.DateField()


class Customer(models.Model):
    #椤惧绫�
    cid = models.AutoField(primary_key=True)
    isvip = models.BooleanField(default=False)
    weichar = models.CharField(max_length=100)
    score = models.IntegerField()