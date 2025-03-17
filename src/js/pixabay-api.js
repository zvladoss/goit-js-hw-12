import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49340244-28a37e61aef480134de69edd6';
export const getPhotos = query => {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 9,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error));
};
