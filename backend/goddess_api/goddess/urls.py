from django.urls import path

from . import views

urlpatterns = [
        path('blog/', views.ListPost.as_view()),
        path('blog/<int:pk>/', views.DetailPost.as_view()),
        ]
