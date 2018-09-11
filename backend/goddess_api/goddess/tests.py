from django.test import TestCase

# Create your tests here.
import datetime

from django.test import TestCase
from django.utils import timezone
from django.urls import reverse

# Create your tests here.
from .models import Post

class PostModelTests(TestCase):
    def test_was_published_recently_with_future_post(self):
        """
        Function returns False for posts whose pub_date is in future
        """
        time = timezone.now() - datetime.timedelta(days=30)
        future_post = Post(pub_date=time)
        self.assertIs(future_post.was_published_recently(), False)

    def test_was_published_recently_with_old_post(self):
        """
        Function returns False for posts whose pub_date is older than 1 day
        """
        time = timezone.now() - datetime.timedelta(days=1, seconds=1)
        old_post = Post(pub_date=time)
        self.assertIs(old_post.was_published_recently(), False)

    def test_was_published_recently_with_recent_post(self):
        """
        was_published_recently() returns True for posts whose pub_date
        is within the last day.
        """
        time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
        recent_post = Post(pub_date=time)
        self.assertIs(recent_post.was_published_recently(), True)

def create_post(title, days):
    """
    Create a post with the given content and published the given number of days offset to now
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Post.objects.create(title=title, pub_date=time)

