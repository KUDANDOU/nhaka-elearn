# Generated by Django 2.0.7 on 2018-10-03 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nhaka', '0020_auto_20181003_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='module',
            name='thumbnail',
            field=models.FileField(blank=True, null=True, upload_to='module/%Y/%m/%d'),
        ),
    ]
