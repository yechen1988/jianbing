# Generated by Django 2.0 on 2018-01-04 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jbadmin', '0009_auto_20180104_2318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='picture',
            field=models.ImageField(upload_to='jianbing/itempic'),
        ),
    ]
