# Generated by Django 5.1.1 on 2024-09-05 20:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_blogpost_created_at_blogpost_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='date',
        ),
        migrations.RemoveField(
            model_name='blogpost',
            name='time',
        ),
    ]
