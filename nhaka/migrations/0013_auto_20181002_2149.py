# Generated by Django 2.0.7 on 2018-10-02 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhaka', '0012_auto_20181002_2149'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='image',
            field=models.ImageField(upload_to='images'),
        ),
    ]