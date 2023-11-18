import simpleLightbox from 'simplelightbox';
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
  search = e.target.elements.searchQuery.value;
  page = 1;
  if (!search) return;
  const data = await getPhoto();
  renderMarkup(data);
  const totalImages = data.totalHits;
  Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
  totalPage = Math.ceil(data.totalHits / 10);
  updateBtnSt();
}

async function getMoreInform() {
  page++;
  updateBtnSt();
  const data = await getPhoto();
  const markup = imagesTemplate(data.hits);
  return refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function updateBtnSt() {
  if (page >= totalPage) {
    refs.loadBtnEl.classList.add('is-hidden');
    refs.messageEl.insertAdjacentHTML('beforeend', textNode);
    return;
  }
  refs.loadBtnEl.classList.remove('is-hidden');
}

var gallery = $('.js-gallery .photo-card').simpleLightbox();

gallery.refresh();
