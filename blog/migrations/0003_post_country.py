# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='country',
            field=models.CharField(max_length=3, choices=[('미국', '미국'), ('독일', '독일'), ('프랑스', '프랑스')], default=datetime.datetime(2015, 11, 5, 1, 44, 16, 739078, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
