from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import render
import re

class SessionFilter(MiddlewareMixin):
    def process_request(self,request):
        if (request.session.get('user_id') or request.session.get('customer_id')):
            return None
        else:
            #寰呮坊鍔犻�昏緫锛氭暟娆¤緭鍏ュ瘑鐮侀敊璇嫆缁濈櫥闄�
            out = ['ad/regist',
                    'ad/login',]#域名过滤列表
            f = None
            for o in out:
                n = re.search(o,request.get_full_path().lower())       
                if n:
                    f = n
            if  f:
                return None
            else:
                return render(request, 'login.html')
        
        

