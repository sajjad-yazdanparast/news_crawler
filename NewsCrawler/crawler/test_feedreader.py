# import feedparser
# link = 'http://feeds.bbci.co.uk/news/rss.xml'
# NewsFeed = feedparser.parse(link)
# #print(NewsFeed)
# entry = NewsFeed.entries[0]

# print (f'{entry.link}\n{entry.published_parsed}\n{entry.summary}')
from bs4 import BeautifulSoup as bs4
import requests
import feedparser
import urllib.parse

def findfeed(site):
    raw = requests.get(site).text
    result = []
    possible_feeds = []
    html = bs4(raw, 'html.parser')
    feed_urls = html.findAll("link", rel="alternate")
    if len(feed_urls) > 1:
        for f in feed_urls:
            t = f.get("type",None)
            if t:
                if "rss" in t or "xml" in t:
                    href = f.get("href",None)
                    if href:
                        possible_feeds.append(href)
    parsed_url = urllib.parse.urlparse(site)
    base = parsed_url.scheme+"://"+parsed_url.hostname
    atags = html.findAll("a")
    for a in atags:
        href = a.get("href",None)
        if href:
            if "xml" in href or "rss" in href or "feed" in href:
                possible_feeds.append(base+href)
    return possible_feeds


site1 = "https://www.bbc.com/news/10628494"
site2 = "https://www.irinn.ir/fa/rss"
print(list(set(findfeed(site2))))

