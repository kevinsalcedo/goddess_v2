from rest_framework import serializers
from .models import Post, File

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
