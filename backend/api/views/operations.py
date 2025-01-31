from django.http import JsonResponse
from api.models.UserComplaints import UserComplaint
from api.decorators import verify_token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from datetime import datetime

@verify_token
@api_view(['POST'])
def resolve_complaint(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to enter these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        complaint_id = request.data.get('complaintId')
        complaint = UserComplaint.objects.get(id=complaint_id)
        complaint.resolve = True
        complaint.save()
        
        return Response({"message": "Complaint Resolved"}, status=status.HTTP_200_OK)
    except UserComplaint.DoesNotExist:
        return Response({"message": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": f"Error resolving complaint: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@verify_token
@api_view(['GET'])
def get_revenue(request):
    try:
        if request.user.userType != 'OPERATIONS':
            return Response({"message": "You are not allowed to view these details"}, status=status.HTTP_401_UNAUTHORIZED)
        
        limit = int(request.GET.get('limit', 10))
        offset = int(request.GET.get('offset', 0))
        
        revenue_data = (
            UserComplaint.objects.values('created_at__date')
            .annotate(totalRevenue=Sum('price'))
            .order_by('created_at__date')[offset:offset + limit]
        )
        
        formatted_data = [
            {"date": entry['created_at__date'].strftime('%Y-%m-%d'), "totalRevenue": entry['totalRevenue']} 
            for entry in revenue_data
        ]
        
        return Response({"message": "Revenue fetched successfully", "revenue": formatted_data}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"message": f"Error fetching revenue: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)