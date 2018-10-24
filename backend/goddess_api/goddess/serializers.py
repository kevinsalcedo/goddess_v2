from rest_framework import serializers
from .models import Post, File, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
                'id',
                'title',
                'content',
                'pub_date',
                'visible'
                )
        model = Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        'id',
        'post',
        'comment_text',
        'pub_date'
        )
        model = Comment

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        'id',
        'src',
        'climber',
        'location',
        'author',
        'caption',
        'visible'
        )
        model = File
