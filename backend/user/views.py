from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import SetPasswordForm
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import update_session_auth_hash  # Import this function
from django.utils.translation import gettext_lazy as _

from .serializers import RegisterSerializer, UserSerializer


class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

# Register User
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# Login
class LoginView(TokenObtainPairView):
    pass

# Logout
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": "Error during logout."}, status=status.HTTP_400_BAD_REQUEST)

# Forgot Password
class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f'http://localhost:5173/reset_password_confirm/{uid}/{token}/'

            message = render_to_string('password_reset_email.html', {
                'reset_link': reset_url,
                'user': user,
            })
            send_mail(
                'Password Reset Request',
                message,
                'from@example.com',
                [email],
                fail_silently=False,
            )
            return Response({'detail': 'Password reset email sent.'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

# Reset Password
class ResetPasswordAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password1 = request.data.get('new_password1')
        new_password2 = request.data.get('new_password2')

        if new_password1 != new_password2:
            return Response({'error': "Passwords don't match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid request.'}, status=status.HTTP_400_BAD_REQUEST)

        if default_token_generator.check_token(user, token):
            form = SetPasswordForm(user, {'new_password1': new_password1, 'new_password2': new_password2})
            if form.is_valid():
                form.save() 
                user.refresh_from_db() 
                print(f"Updated Password Hash: {user.password}")
                return Response({'success': 'Password reset successful.'}, status=status.HTTP_200_OK)
            return Response({'error': form.errors.as_json()}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
# Password Reset Confirm
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        user = self.get_user(uidb64)
        if user and default_token_generator.check_token(user, token):
            return render(request, 'password_reset_confirm.html', {'uidb64': uidb64, 'token': token})
        return Response({'error': _('Invalid or expired link')}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, uidb64, token):
        user = self.get_user(uidb64)
        if user and default_token_generator.check_token(user, token):
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                form.save()
                update_session_auth_hash(request, user)  # Update the session to prevent log out
                return redirect(reverse('login'))
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': _('Invalid or expired link')}, status=status.HTTP_400_BAD_REQUEST)

    def get_user(self, uidb64):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            return User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return None
