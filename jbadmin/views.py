from django.shortcuts import render
from jbadmin.models import Users,Item,Category
import json
from django.http import HttpResponse
"""
Post error：
1：找不到用户
2:该用户名已注册
3:Item保存失败
4:找不到对应商品
"""

def index(request):
    response=render(request,"index.html",{});
    return response

def login(request):
    #登陆
    if request.POST:
        u_name = request.POST.get('uname')
        u_psw = request.POST.get('upsw')
        u = []
        if u_name and u_psw:
            try:
                u = Users.objects.get(uname=u_name,password=u_psw)
            except:
                u = False
        if u:
            request.session['user_id'] = u.uid
            request.session['user_name'] = u.uname
            request.session['user_level'] = u.level_id
            return render(request,'index.html',{'success':1})
        else:    
            return render(request,'login.html',{'error':1})
    else:
        return render(request,'login.html')


def regist(request):
#     注册

    if request.POST:
        u_name = request.POST.get('uname')
        u_psw = request.POST.get('upsw')
        u_level = request.POST.get('ulevel')
        if u_name and u_psw and u_level:
            u = Users.objects.filter(uname=u_name)
            if u:
                return render(request,'regist.html',{'error':2})
            else:
                Users.objects.create(uname=u_name,password=u_psw,level_id=u_level)
                return render(request,'login.html',{'success':1})
        else:
            return render(request,'regist.html',{'error':2})   
    else:
        return render(request,'regist.html')   


#对于商品的相关方法    
def editItem(request):
    #添加，编辑商品
#     iname = models.CharField(max_length=100)         iname
#     price = models.FloatField()                      iprice
#     category_id = models.IntegerField()  #CategoryID cid
#     picture = models.FileField(upload_to='./upload/itempic/')  ipic
    if request.GET.get('iid'):
        i_id = request.GET.get('iid')
#         try
        i = Item.objects.get(iid=i_id)
        il = {'iid':i_id,
              'iname':i.iname,
              'iprice':i.price,
              'cid':i.category_id,
              'ipic':i.picture.url
            }
        return render(request,'editItem.html',{'data':json.dumps(il)})
#         except:
#             return render(request,'editItem.html',{'error':4})
    elif request.POST:
        i_id = request.POST.get('iid')
        i_name = request.POST.get('iname')
        i_price = request.POST.get('iprice')
        i_cid = request.POST.get('cid')
        i_pic = request.FILES.get('ipic')
        if i_name and i_price and i_cid and i_pic:
            if i_id:#判断新建或修改
                i = Item(iid=i_id,iname=i_name,price=i_price,category_id=i_cid,picture=i_pic)
                try:
                    i.save()
                    return render(request, 'editItem.html', {'success':1})
                except:
                    return render(request, 'editItem.html', {'error':3})
            else:
                if Item.objects.filter(iname=i_name):#去重逻辑
                    return render(request, 'editItem.html', {'error':3})
                else:
                    i = Item(iname=i_name,price=i_price,category_id=i_cid,picture=i_pic)
                    try:
                        i.save()
                        return render(request, 'editItem.html', {'success':1})
                    except:
                        return render(request, 'editItem.html', {'error':3})
                
                
        else:
            return render(request, 'editItem.html', {'error':3})
            
    else:
        return render(request,'editItem.html')


def getItemsPage(request):
    return render(request,'items.html')
        
def getItems(request):
    resp = []
    if request.POST:  
        return HttpResponse(json.dumps(resp), content_type="application/json")
    else:
        items = []
        try:
            items = Item.objects.all()
            for i in items:
                iitem = {'iid':i.iid,
                         'iname':i.iname,
                         'price':i.price,
                         'pic':i.picture.url}
                resp.append(iitem)
            return HttpResponse(json.dumps(resp), content_type="application/json")
        except:
            resp = {'error':'读取数据失败'}
            return HttpResponse(json.dumps(resp), content_type="application/json")


#对于分类的相关方法
def getCategoryPage(request):
    return render(request,'categorys.html')

def getCategorys(request):
    resp = []
    if request.POST:
        return HttpResponse(json.dumps(resp), content_type="application/json")      
    else:
        cas = []
        try:
            cas = Category.objects.order_by('cid')
            if len(cas) is 0:
                return HttpResponse(json.dumps(resp), content_type="application/json")
            else:
                for c in cas:
                    jc = {'cid':c.cid,
                          'cname':c.cname,
                          'cdepend_id':c.cdepend_id }
                    resp.append(jc)
                    return HttpResponse(json.dumps(resp), content_type="application/json")
        except:
            resp = {'error':'读取数据失败'}
            return HttpResponse(json.dumps(resp), content_type="application/json")
        
         
            