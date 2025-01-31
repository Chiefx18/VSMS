from django.urls import path
from api.views.auth import signup, login

urlpatterns = [
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"),
]
