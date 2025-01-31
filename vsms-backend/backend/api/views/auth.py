import json
from django.shortcuts import render
from django.http import JsonResponse
from api.models.user import User
from django.contrib.auth.hashers import make_password, check_password

def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")
            userType = data.get("userType")

            if not name:
                return JsonResponse({"error": "Name field is required"}, status=400)

            hashed_password = make_password(password)

            user = User.objects.create(name=name, email=email, password=hashed_password, userType=userType)
            return JsonResponse({"message": "User created successfully"}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

# Login view to authenticate and generate token
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # Check if user exists
            user = User.objects.filter(email=email).first()
            if not user:
                return JsonResponse({"error": "Invalid email or password"}, status=400)

            # Check if the provided password matches the stored hash
            if not check_password(password, user.password):
                return JsonResponse({"error": "Invalid email or password"}, status=400)

            # Generate token (in this case, it's just a simple token `aut_{userId}`)
            token = f"Bearer auth_{user.id}"

            return JsonResponse({"message": "Login successful", "token": token, "userId": user.id, "userType":user.userType}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


