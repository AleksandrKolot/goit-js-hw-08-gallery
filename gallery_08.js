import galerry from './gallery-items.js';

//Разметка галереи
const ElemArr = galerry.map(({ preview, original, description }) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  img.classList.add('gallery__image');
  img.src = preview;
  img.alt = description;

  a.classList.add('gallery__link');
  a.href = original;
  a.title = description;

  li.classList.add('gallery__item');

  a.append(img);
  li.append(a);
  return li;
});

const galleryList = document.querySelector('.js-gallery');
galleryList.append(...ElemArr);
