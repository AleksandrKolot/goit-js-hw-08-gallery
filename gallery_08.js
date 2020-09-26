import exportArr from './gallery-items.js';

//Разметка галереи
let i = 0;
const ElemArr = exportArr.map(({ preview, original, description }) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  img.classList.add('gallery__image');
  img.src = preview;
  img.alt = description;

  a.classList.add('gallery__link');
  a.href = original;
  a.title = description;
  a.setAttribute('data-num', i);

  li.classList.add('gallery__item');

  a.append(img);
  li.append(a);
  i += 1;
  return li;
});

const galleryImgMarkup = document.querySelector('.js-gallery');
galleryImgMarkup.append(...ElemArr);

// Модальное окно
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImgRef = document.querySelector('.lightbox__image');
const closeModalBtnRef = document.querySelector(
  '[data-action="close-lightbox"]',
);
const backdropRef = document.querySelector('.lightbox__content');

galleryImgMarkup.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.tagName === 'ul') return;
  const currentLink = evt.target.closest('a');
  lightboxImgRef.src = currentLink.href;
  lightboxImgRef.dataset.num = currentLink.dataset.num;
  lightboxImgRef.alt = currentLink.title;
  lightboxRef.classList.add('is-open');
  window.addEventListener('keydown', onEscPress);
});

// Закрытие модалки по кнопке
closeModalBtnRef.addEventListener('click', makeCloseModal);
backdropRef.addEventListener('click', onBackdropClick);

function makeCloseModal() {
  lightboxRef.classList.remove('is-open');
  lightboxRef.addEventListener(
    'transitionend',
    function handleLightboxTransition() {
      lightboxImgRef.src = '#';
      lightboxImgRef.dataset.num = '-1';
      lightboxImgRef.alt = '#';
      lightboxRef.removeEventListener(
        'transitionend',
        handleLightboxTransition,
      );
    },
  );
  window.removeEventListener('keydown', onEscPress);
}
//Закрытие модалки по Backdrop
function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {
    makeCloseModal();
  }
}
// Закрытие модалки по Escape
function onEscPress(evt) {
  if (evt.code === 'Escape') {
    makeCloseModal();
  }
}
