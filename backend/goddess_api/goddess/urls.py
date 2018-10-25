from django.urls import path

from . import views

urlpatterns = [
        path('blog/', views.ListPost.as_view()),
        path('blog/<int:pk>/', views.DetailPost.as_view()),
        path('upload/', views.FileView.as_view(), name='file-upload'),
        path('comment/', views.CommentView.as_view()),
        path('blog_comment/', views.ListComment.as_view()),
        path('photos/', views.ListFile.as_view()),
        path('photos/<int:pk>/', views.DetailFile.as_view()),
        ]
