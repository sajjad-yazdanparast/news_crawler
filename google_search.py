from googlesearch import search
from bs4 import BeautifulSoup
import urllib.request
import re


def is_rss(url):
	html_page = urllib.request.urlopen(url)
	soup = BeautifulSoup(html_page , "lxml")
	result = soup.findAll('rss')
	if len(result)>0:
		return True
	else:
		return False

# returns array of all rss url found
def find_rss_url(base):
	response = ""
	query = "site:" +base+  " rss"
	address =next(search(query, tld="co.in", num=10, stop=10, pause=2))
#	print(address)
	html_page = urllib.request.urlopen(address)
	soup = BeautifulSoup(html_page, "html.parser")
	for link in soup.findAll('a'):
		l = link.get('href')
		if l is not None:
			#tx = re.search("^/+.*(rss)+.*",l)
			if re.search("(rss)+.*",l):
				if re.search("^/.*" , l):
					l = base + l
			else:
				continue
			if is_rss(l):
				response = l
				break

	return response


print(find_rss_url("https://nytimes.com‏"))

