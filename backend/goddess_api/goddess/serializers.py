from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
                'id',
                'title',
                'content',
                'pub_date'
                )
        model = Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        'id',
        'comment_text',
        'pub_date'
        )
