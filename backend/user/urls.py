from django.urls import path
from .views import RegisterView, LoginView, LogoutView, ForgotPasswordView, PasswordResetConfirmView, ResetPasswordAPIView,UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset-password/', ResetPasswordAPIView.as_view(), name='api_reset_password'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
