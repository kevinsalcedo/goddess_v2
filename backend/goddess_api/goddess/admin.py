from django.contrib import admin

# Register your models here.
from .models import Post, File, Comment, Tag

admin.site.register(Post)
admin.site.register(File)
admin.site.register(Comment)
admin.site.register(Tag)
