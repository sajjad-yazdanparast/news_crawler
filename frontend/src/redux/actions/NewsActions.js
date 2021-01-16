import axios from "axios";
export const getNews = (requestData) => dispatch => {
  const actionData = {};
  dispatch({
    type: 'GET_NEWS_REQUESTED',
    //...TODO fill this action
  })
  let url = `127.0.0.1:8000/api`;
  return axios.post(url, requestData)
    .then((response) => {
      dispatch({
        type: 'GET_NEWS_RECEIVED',
        //...TODO fill this action
      })
    })
    .catch((error) => {
      dispatch({
        type: 'GET_NEWS_FAILURE',
        //...TODO fill this action
      })
    });
}