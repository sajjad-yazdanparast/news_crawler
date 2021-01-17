import axios from "axios";
export const getNews = (filteredData) => dispatch => {
  dispatch({
    type: 'GET_NEWS_REQUESTED',
  })
  let url = `http://127.0.0.1:8000/api/crawler/result/`;
  return axios.post(url, filteredData)
    .then((response) => dispatch({
        type: 'GET_NEWS_RECEIVED',
        payload: response.data,
      })
    )
    .catch((error) => dispatch({
        type: 'GET_NEWS_FAILURE',
      })
    );
}