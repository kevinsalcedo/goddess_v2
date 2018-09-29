from rest_framework import serializers
from .models import Post, Comment, File

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
        'comment_text',
        'pub_date'
        )

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
