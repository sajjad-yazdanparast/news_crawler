
const initState = {

};

export const News = (state = initState, action) => {
  switch (action.type) {
    case 'GET_NEWS_REQUESTED':
    case 'GET_NEWS_RECEIVED':
    case 'GET_NEWS_FAILURE':
    default:
      return state;
  }
}