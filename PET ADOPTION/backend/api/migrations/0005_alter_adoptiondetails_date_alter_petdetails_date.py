# Generated by Django 4.2.3 on 2024-06-19 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_customuser_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="adoptiondetails",
            name="date",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name="petdetails",
            name="date",
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]