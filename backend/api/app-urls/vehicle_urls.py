from django.urls import path
from api.views.vehicle import all_vehicles, add_vehicle, edit_vehicle, delete_vehicle

urlpatterns = [
    path("all/", all_vehicles, name="allVehicles"),
    path('edit/', edit_vehicle ,name='editVehicle'),
    path('add/',add_vehicle , name='addVehicle'),
    path('delete/', delete_vehicle, name='deleteVehicle'),
]
