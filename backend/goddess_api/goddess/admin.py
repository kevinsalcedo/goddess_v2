from django.contrib import admin

# Register your models here.
from .models import Post, File

admin.site.register(Post)
admin.site.register(File)
