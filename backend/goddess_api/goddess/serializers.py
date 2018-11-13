from rest_framework import serializers
from .models import Post, File, Comment, Tag

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
                'id',
                'title',
                'content',
                'pub_date',
                'visible',
                'tags'
                )
        model = Post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        'id',
        'post',
        'comment_text',
        'pub_date',
        'name'
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

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
        'id',
        'title'
        )
        model = Tag
