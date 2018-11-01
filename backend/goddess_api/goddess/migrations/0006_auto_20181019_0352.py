# Generated by Django 2.1.2 on 2018-10-19 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goddess', '0005_post_visible'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='author',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='caption',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='climber',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='location',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]