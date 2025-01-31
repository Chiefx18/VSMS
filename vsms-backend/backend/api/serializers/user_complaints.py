from rest_framework import serializers
from api.models.UserComplaints import UserComplaint

class UserComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserComplaint
        fields = '__all__'
