import random
from django.utils.text import slugify
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from online_shop import settings

def slugify_instance_name(instance, save=False, new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.name)
    Klass = instance.__class__
    qs = Klass.objects.filter(slug=slug).exclude(id=instance.id)
    if qs.exists():
        # auto generate new slug
        rand_int = random.randint(300_000, 500_000)
        slug = f"{slug}-{rand_int}"
        return slugify_instance_name(instance, save=save, new_slug=slug)
    instance.slug = slug
    if save:
        instance.save()
    return instance

def send_message(data):
    topic = data['topic'] + " - " + data['name']
    html_content = render_to_string("api/message.html", data)
    text_content = strip_tags(html_content)
    emaill = EmailMultiAlternatives(
        topic,
        text_content,
        settings.EMAIL_HOST_USER,
        ['szymon.kalkowski@wp.pl']
    )
    emaill.attach_alternative(html_content, "text/html")
    emaill.send()

