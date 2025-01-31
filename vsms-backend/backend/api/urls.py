from django.urls import path, include

urlpatterns = [
    path('auth/', include('api.app-urls.auth_urls')), 
    path('user/', include('api.app-urls.user_urls')), 
    path('operations/', include('api.app-urls.operations_urls')),
    path('vehicle/', include('api.app-urls.vehicle_urls')),
    path('component/', include('api.app-urls.component_urls'))
    
]
