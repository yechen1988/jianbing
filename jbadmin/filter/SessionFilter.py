from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import render

class SessionFilter(MiddlewareMixin):
    def process_request(self,request):
        p = request.get_full_path().lower()[1:6]
        if p == 'login' or p == 'regis':
            return None
        
        if (request.session.get('user_id') or request.session.get('customer_id')):
            return None
        else:
            #寰呮坊鍔犻�昏緫锛氭暟娆¤緭鍏ュ瘑鐮侀敊璇嫆缁濈櫥闄�
            return render(request, 'login.html')
