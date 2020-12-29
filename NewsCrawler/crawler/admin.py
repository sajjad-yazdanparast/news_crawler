from django.contrib import admin
from .models import News , Website
# Register your models here.

class NewsAdmin(admin.ModelAdmin) :
    list_display = ("format_text", "publish_date", "crawl_date" , "get_site_name") 

    def format_text(self, obj) :
        return str(obj.text)[:100] + " ..."

    def get_site_name(self, obj) :
        return obj.site.name
        
    format_text.short_description = "text"
    get_site_name.short_description = "site"

class WebsiteAdmin (admin.ModelAdmin) :
    list_display = ("url", "name") 


admin.site.register(News, NewsAdmin)
admin.site.register(Website, WebsiteAdmin)

