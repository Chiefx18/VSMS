from django.http import JsonResponse
from api.models.user import User
from api.decorators import verify_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.models.UserComplaints import UserComplaint
from api.models.vehicle import Vehicle
from api.serializers.user_complaints import UserComplaintSerializer
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt

@verify_token
def get_profile(request):
    user = request.user  
    return JsonResponse({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "userType": user.userType
    })

@api_view(['POST'])
@verify_token
def register_complaint(request):
    try:
        user_details = request.user
        user_id = user_details.id
        data = request.data
        vehicle_id = data.get('vehicleId')
        if not Vehicle.objects.filter(id=vehicle_id).exists():
            return Response({'message': 'Invalid vehicleId. Vehicle does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        complaint = UserComplaint.objects.create(
            user_id=user_id,
            vehicle_id=vehicle_id,
            description=data['description'],
            component_id=data['componentId'],
            quantity=data['quantity'],
            payment=data['payment'],
            price=data['price'],
            resolve=data['resolve']
        )

        return Response({'message': 'Complaint Registered Successfully', 'data': UserComplaintSerializer(complaint).data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'message': f'Error registering complaint: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token 
@api_view(['GET'])
def get_user_complaints(request):
    try:
        user_details = request.user
        complaints = UserComplaint.objects.filter(user_id=user_details.id)
        return Response({'message': 'All Complaints fetched Successfully', 'data': UserComplaintSerializer(complaints, many=True).data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'message': f'Error fetching complaints: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token 
@api_view(['GET'])
def get_all_user_complaints(request):
    try:
        complaints = UserComplaint.objects.all()
        return Response({'message': 'All Complaints fetched Successfully', 'data': UserComplaintSerializer(complaints, many=True).data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'message': f'Error fetching complaints: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@verify_token 
@api_view(['POST'])
def pay_for_complaint(request):
    try:
        complaint_id = request.data['complaintId']
        complaint = UserComplaint.objects.get(id=complaint_id)
        complaint.payment = True
        complaint.save()
        return Response({'message': 'Payment paid successfully', 'data': UserComplaintSerializer(complaint).data}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({'message': f'Error in payments: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
