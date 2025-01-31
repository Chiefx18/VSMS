from django.urls import path
from api.views.operations import resolve_complaint, get_revenue

urlpatterns = [
    path('resolveComplaint/', resolve_complaint, name='resolveComplaint'),
    path('getRevenue/', get_revenue, name='getRevenue'),
]
