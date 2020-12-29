from django.db import models

# Create your models here.

class Website (models.Model):
    url = models.URLField(primary_key=True)
    name = models.TextField()
    need_for_crawl = models.BooleanField(default=True)


class News (models.Model) :
    text = models.TextField()
    publish_date = models.DateField()
    crawl_date = models.DateField(auto_created=True)

    site = models.ForeignKey(Website, on_delete=models.SET_NULL, null=True)
