import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getPhoto(search) {
  const PARAMS = new URLSearchParams({
    key: '40714634-5d1b24d001003f10aac648f1b',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  axios.get('' + '?' + PARAMS);
}
