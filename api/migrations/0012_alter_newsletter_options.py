# Generated by Django 4.1.4 on 2022-12-26 18:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_newsletter'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='newsletter',
            options={'verbose_name': 'Newsletter', 'verbose_name_plural': 'Newsletter'},
        ),
    ]