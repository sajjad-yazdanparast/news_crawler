import feedparser
link = 'https://khabarfarsi.com'
NewsFeed = feedparser.parse(link)
#print(NewsFeed)
entry = NewsFeed.entries[0]

print (f'{entry.link}\n{entry.published_parsed}\n{entry.summary}')
