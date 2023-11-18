import axios from 'axios';
import Notiflix from 'notiflix';
import { search, page } from './index.js';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getPhoto() {
  const PARAMS = new URLSearchParams({
    key: '40714634-5d1b24d001003f10aac648f1b',
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 10,
    page: page,
  });

  const res = await axios.get('' + '?' + PARAMS);
  if (!res.data.hits.length) {
    throw Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return res.data;
}
