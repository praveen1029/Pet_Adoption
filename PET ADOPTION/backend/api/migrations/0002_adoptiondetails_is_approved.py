# Generated by Django 4.2.3 on 2024-06-29 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="adoptiondetails",
            name="is_approved",
            field=models.BooleanField(default=False),
        ),
    ]