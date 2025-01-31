from django.urls import path
from api.views.component import add_component,all_vehicle_components,edit_component,delete_component,get_vehicle_components

urlpatterns = [
    path('add/', add_component, name='addComponent'),
    path('all/', all_vehicle_components, name='allComponents'),
    path('', get_vehicle_components, name='allVehicleComponents'),
    path('edit/', edit_component, name='editComponent'),
    path('delete/', delete_component, name='deleteComponent'),
]
