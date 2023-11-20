import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { getPhoto } from './photo-api';
import { imagesTemplate } from './template';
import { refs } from './refs';
import { renderMarkup } from './render';

export let search = '';
export let page = 1;
export let totalPage = 1;
const textNode = "We're sorry, but you've reached the end of search results.";

refs.loadBtnEl.classList.add('is-hidden');
refs.searchFormEl.addEventListener('submit', getSerchPhoto);
refs.loadBtnEl.addEventListener('click', getMoreInform);

async function getSerchPhoto(e) {
  e.preventDefault();
  search = e.target.elements.search.value;
  page = 1;
  if (!search) return;
  const data = await getPhoto();
  renderMarkup(data);
  lightbox.refresh();
  const totalImages = data.totalHits;
  Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  totalPage = Math.ceil(data.totalHits / 40);
  updateBtnSt();
}

async function getMoreInform() {
  page++;
  updateBtnSt();
  const data = await getPhoto();
  const markup = imagesTemplate(data.hits);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function updateBtnSt() {
  if (page >= totalPage) {
    refs.loadBtnEl.classList.add('is-hidden');
    refs.messageEl.insertAdjacentHTML('beforeend', textNode);
    return;
  }
  refs.loadBtnEl.classList.remove('is-hidden');
}

const lightbox = new SimpleLightbox('.gallery__link', {
  captionDelay: 250,
});
