from django.contrib import admin

# Register your models here.
from .models import Post, File, Comment

admin.site.register(Post)
admin.site.register(File)
admin.site.register(Comment)
