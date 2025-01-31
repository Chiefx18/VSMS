from django.urls import path
from api.views.user import get_profile, register_complaint, get_all_user_complaints, get_user_complaints, pay_for_complaint

urlpatterns = [
    path("", get_profile, name="get_profile"),
    path('registerComplaint/', register_complaint, name='register_complaint'),
    path('userComplaints/', get_user_complaints, name='user_complaints'),
    path('allComplaints/', get_all_user_complaints, name='all_complaints'),
    path('payComplaint/', pay_for_complaint, name='pay_complaint'),
]
