from django.db import models

class Vehicle(models.Model):
    name = models.CharField(max_length=255)
    vehicle_type = models.IntegerField()

    def __str__(self):
        return self.name
