# Generated by Django 4.1.4 on 2022-12-26 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_collections_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Newsletter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100)),
            ],
        ),
    ]