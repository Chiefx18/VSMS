from django.http import JsonResponse
from api.models.vehicleComponent import VehicleComponent
from api.models.vehicle import Vehicle
from api.decorators import verify_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@verify_token
@api_view(['POST'])
def add_component(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to enter these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        name = request.data.get('name')
        vehicle_id = request.data.get('vehicleId')
        price = request.data.get('price')
        quantity = request.data.get('quantity')
        
        if not name or not vehicle_id or not price or not quantity:
            return Response({"message": "Component details not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        VehicleComponent.objects.create(name=name, vehicle_id=vehicle_id, price=price, quantity=quantity)
        return Response({"message": "Component Added Successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"message": f"Error Adding component: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['GET'])
def all_vehicle_components(request):
    try:
        vehicle_id = request.query_params.get('vehicleId')
        
        if vehicle_id:
            components = VehicleComponent.objects.filter(vehicle_id=vehicle_id).values()
        else:
            components = VehicleComponent.objects.all().values()
        
        return Response({"message": "Components fetched Successfully", "data": list(components)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error fetching components: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['PUT'])
def edit_component(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to enter these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        component_id = request.data.get('componentId')
        name = request.data.get('name')
        vehicle_id = request.data.get('vehicleId')
        price = request.data.get('price')
        quantity = request.data.get('quantity')
        
        if not component_id or not name or not vehicle_id or not price or not quantity:
            return Response({"message": "Component ID, name, vehicle ID, price, or quantity not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        VehicleComponent.objects.filter(id=component_id).update(name=name, vehicle_id=vehicle_id, price=price, quantity=quantity)
        return Response({"message": "Component updated Successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error updating component: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['DELETE'])
def delete_component(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to delete"}, status=status.HTTP_401_UNAUTHORIZED)
        
        component_id = request.data.get('componentId')
        
        if not component_id:
            return Response({"message": "Component ID not sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        VehicleComponent.objects.filter(id=component_id).delete()
        return Response({"message": "Component deleted Successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error deleting component: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['GET'])
def get_vehicle_components(request):
    try:
        vehicle_id = request.query_params.get('vehicleId')
        
        # Ensure vehicle_id is provided
        if not vehicle_id:
            return Response({"message": "Vehicle ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the vehicle exists
        if not Vehicle.objects.filter(id=vehicle_id).exists():
            return Response({"message": "Vehicle with the given ID does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        # Fetch components for the vehicle
        components = VehicleComponent.objects.filter(vehicle_id=vehicle_id).values()
        
        return Response({"message": "Components fetched Successfully", "data": list(components)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error fetching components: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

