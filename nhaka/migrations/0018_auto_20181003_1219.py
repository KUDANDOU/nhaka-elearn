# Generated by Django 2.0.7 on 2018-10-03 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhaka', '0017_auto_20181003_1155'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='module',
            name='file',
        ),
        migrations.AddField(
            model_name='module',
            name='thumbnail',
            field=models.ImageField(default=0, upload_to='images'),
            preserve_default=False,
        ),
    ]
