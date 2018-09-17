# Generated by Django 2.0.7 on 2018-08-18 22:33

from django.db import migrations
import nhaka.fields


class Migration(migrations.Migration):

    dependencies = [
        ('nhaka', '0002_content_file_image_text_video'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='content',
            options={'ordering': ['order']},
        ),
        migrations.AlterModelOptions(
            name='module',
            options={'ordering': ['order']},
        ),
        migrations.AddField(
            model_name='content',
            name='order',
            field=nhaka.fields.OrderField(blank=True, default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='module',
            name='order',
            field=nhaka.fields.OrderField(blank=True, default=0),
            preserve_default=False,
        ),
    ]
