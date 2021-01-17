const updateFetchedNews = (currentFetchedNews, payload) => {
  payload.forEach(newFetchNews => {
    let foundPrevFetchedUrlIndex = currentFetchedNews.findIndex(({ url }) => url === newFetchNews.url);
    if(foundPrevFetchedUrlIndex >= 0) {
      newFetchNews.news.forEach(newNews => {
        if(newNews.news !== [] &&
          !currentFetchedNews[foundPrevFetchedUrlIndex].news.some(prevNews => prevNews.link === newNews.link)) {
          console.log('now we are in update fetching news, this is new news', newNews);
          currentFetchedNews[foundPrevFetchedUrlIndex].news.push(newNews);
        }
      });
    }
    else {
      console.log('now we are in update fetching news, this is new fetched url', newFetchNews);
      currentFetchedNews.push(newFetchNews);
    }
  });

  return currentFetchedNews;
}

const initState = {
  fetchedNews: [
    {
      url: '',
      news: [
        {
          title: '',
          summary: '',
          link: '',
          date: '',
        },
      ],
    },
  ],
  isFetching: null,
  hasError: null,
};

export const NewsList = (state = initState, action) => {
  let currentFetchedNews = [...state.fetchedNews];
  switch (action.type) {
    case 'GET_NEWS_REQUESTED':
      console.log("GET_NEWS_REQUESTED");
      return {
        ...state,
        isFetching: true,
        hasError: false,
      }
    case 'GET_NEWS_RECEIVED':
      console.log("GET_NEWS_RECEIVED");
      currentFetchedNews = updateFetchedNews(currentFetchedNews, action.payload);
      return {
        fetchedNews: [...currentFetchedNews],
        isFetching: false,
        hasError: false,
      }
    case 'GET_NEWS_FAILURE':
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    default:
      return state;
  }
}