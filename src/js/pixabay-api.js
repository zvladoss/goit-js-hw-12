import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49340244-28a37e61aef480134de69edd6';
export const getPhotos = async (query, page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
