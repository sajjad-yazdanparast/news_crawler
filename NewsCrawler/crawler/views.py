from django.shortcuts import render
from rest_framework import status 
from rest_framework.response import Response 
from rest_framework.views import APIView
from .serializer import OrderSerializer
import feedparser
from time import mktime
from datetime import datetime

# Create your views here.

class CrawlerResult(APIView) :

    def post (self, *args ,**kwargs) :

        serializer = OrderSerializer(data=self.request.data, many=True)

        if serializer.is_valid():
            data = []
            for order in serializer.data :
                data.append({
                    'url' : order['url'] ,
                    "news" : self.mine_news(order)
                })
            
            return Response(data,status=status.HTTP_200_OK)
        else :
            return Response(
                data = {"message" : serializer.errors} ,
                status= status.HTTP_400_BAD_REQUEST
            )



    
    @staticmethod
    def mine_news(order:object) :
        try :
            news_feed = feedparser.parse(order['url'])
        except Exception as url_error :
            # TODO => call function developed by hossein and pass url as input then get correct rss url as output 
            link = CrawlerResult.get_rss(order['url'])
            return None 

        try :
           
            return [
                str(entry['title']) for entry in news_feed.entries if  \
                ('published' in entry.keys() and CrawlerResult.is_in_range(entry['published_parsed'], order['startDate'], order['endDate'])) or \
                 'published' not in entry.keys() 
                 ][:order['newsCount']]

        except Exception as exc:
            
            print(f'some error eccured.\n{exc}')
            return None

    @staticmethod
    def get_rss(link) :
        
        return None

    @staticmethod
    def generage_date_from_rss(raw_date_format) -> datetime:
        return datetime.fromtimestamp(mktime(raw_date_format)).date()

    @staticmethod
    def generage_date_from_user(raw_date_format) -> datetime:
        return datetime.strptime(raw_date_format, '%Y-%m-%d').date()

    @staticmethod 
    def is_in_range(target_date:datetime, start_date:datetime, end_date:datetime) :
        return  CrawlerResult.generage_date_from_user(start_date) <= CrawlerResult.generage_date_from_rss(target_date) <= CrawlerResult.generage_date_from_user(end_date)
