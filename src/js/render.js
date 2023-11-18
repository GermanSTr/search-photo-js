import { refs } from './refs';
import { imagesTemplate } from './template';

export function renderMarkup(elem) {
  const markup = imagesTemplate(elem.hits);
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('afterbegin', markup);
}
