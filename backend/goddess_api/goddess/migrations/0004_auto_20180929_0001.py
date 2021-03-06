# Generated by Django 2.1.1 on 2018-09-29 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goddess', '0003_auto_20180926_2302'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='file',
        ),
        migrations.AddField(
            model_name='file',
            name='climber',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='file',
            name='src',
            field=models.ImageField(default='', upload_to=''),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='file',
            name='author',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='caption',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='file',
            name='location',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
