from django.db import models
from api.models.user import User
from api.models.vehicle import Vehicle
from api.models.vehicleComponent import VehicleComponent

class UserComplaint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    component = models.ForeignKey(VehicleComponent, on_delete=models.CASCADE)
    description = models.TextField()
    quantity = models.IntegerField()
    price = models.IntegerField()
    payment = models.BooleanField(default=False)
    resolve = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Complaint by {self.user.name} regarding vehicle {self.vehicle.name}"
