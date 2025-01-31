from django.http import JsonResponse
from api.models.vehicle import Vehicle
from api.decorators import verify_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@verify_token
@api_view(['POST'])
def add_vehicle(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to enter these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        name = request.data.get('name')
        vehicle_type = request.data.get('vehicleType')
        
        if not name or not vehicle_type:
            return Response({"message": "Vehicle name or type not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        Vehicle.objects.create(name=name, vehicle_type=vehicle_type)
        return Response({"message": "Vehicle Added Successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": f"Error Adding vehicle: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def all_vehicles(request):
    try:
        vehicles = Vehicle.objects.all().values()
        return Response({"message": "Vehicles fetched Successfully", "data": list(vehicles)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error fetching vehicles: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['PUT'])
def edit_vehicle(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to enter these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        vehicle_id = request.data.get('vehicleId')
        name = request.data.get('name')
        vehicle_type = request.data.get('vehicleType')
        
        if not vehicle_id or not name or not vehicle_type:
            return Response({"message": "Vehicle ID, name, or type not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        Vehicle.objects.filter(id=vehicle_id).update(name=name, vehicle_type=vehicle_type)
        return Response({"message": "Vehicle updated Successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error updating vehicle: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['DELETE'])
def delete_vehicle(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to delete"}, status=status.HTTP_401_UNAUTHORIZED)
        
        vehicle_id = request.data.get('vehicleId')
        
        if not vehicle_id:
            return Response({"message": "Vehicle ID not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        Vehicle.objects.filter(id=vehicle_id).delete()
        return Response({"message": "Vehicle deleted Successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error deleting vehicle: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
