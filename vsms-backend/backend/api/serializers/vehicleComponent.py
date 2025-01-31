from rest_framework import serializers
from api.models.vehicleComponent import VehicleComponent
from api.serializers.vehicle import VehicleSerializer

class VehicleComponentSerializer(serializers.ModelSerializer):
    vehicle = VehicleSerializer()

    class Meta:
        model = VehicleComponent
        fields = '__all__'
