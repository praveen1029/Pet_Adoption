# Generated by Django 4.2.3 on 2024-06-22 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_alter_petdetails_remark"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="is_superuser",
            field=models.BooleanField(default=False),
        ),
    ]
