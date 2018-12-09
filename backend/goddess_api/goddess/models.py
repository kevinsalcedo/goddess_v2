import datetime

from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.
class Tag(models.Model):
    title = models.CharField(max_length=25)

    def __str__(self):
        return self.title

class Post(models.Model):
    title = models.CharField(max_length=100)
    content = RichTextUploadingField()
    pub_date = models.DateField('date published')
    visible = models.BooleanField(default=True)
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=500)
    pub_date = models.DateField('date published')
    name = models.CharField(max_length=50, default='Anonymous')

    def __str__(self):
        return self.comment_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class File(models.Model):
    src = models.ImageField(blank=False)
    climber = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    author = models.CharField(max_length=30, blank=True, null=True)
    caption = models.CharField(max_length=150, blank=True, null=True)
    visible = models.BooleanField(default=False)

    def __str__(self):
        return self.src.url.split("media/",1)[1]
