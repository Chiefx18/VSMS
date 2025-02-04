from django.http import JsonResponse
from api.models.user import User


def verify_token(view_func):
    def _wrapped_view(request, *args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return JsonResponse({"message": "Token missing"}, status=400)
        
        try:
            user_id = token.replace("Bearer auth_", "") 
            user = User.objects.get(id=user_id)
            request.user = user
            
        except User.DoesNotExist:
            return JsonResponse({"message": "User not found or invalid token"}, status=404)
        
        setattr(request, '_dont_enforce_csrf_checks', True) 
        
        return view_func(request, *args, **kwargs)
    
    return _wrapped_view
