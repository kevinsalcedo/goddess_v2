import datetime

from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = RichTextField()
    pub_date = models.DateField('date published')

    def __str__(self):
        return self.title

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment_text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('datetime published')

    def __str__(self):
        return self.comment_text

    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

class File(models.Model):
    file = models.FileField(blank=False, null=False)
    location = models.CharField(max_length=25)
    author = models.CharField(max_length=25)
    caption = models.CharField(max_length=100)
    visible = models.BooleanField(default=False)

    def __str__(self):
        return self.caption
