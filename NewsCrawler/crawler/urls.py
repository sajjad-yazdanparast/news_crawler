from django.urls import path
from .views import CrawlerResult 
urlpatterns = [
    path('result/', CrawlerResult.as_view(), name='crawler-results'),
]