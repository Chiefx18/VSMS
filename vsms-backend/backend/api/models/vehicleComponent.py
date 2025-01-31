from django.db import models
from api.models.vehicle import Vehicle

class VehicleComponent(models.Model):
    vehicle = models.ForeignKey(Vehicle, related_name="components", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.vehicle.name}"
