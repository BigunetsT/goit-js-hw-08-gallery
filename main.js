import galleryItems from './gallery-items.js';

///Refs
const galleryRef = document.querySelector('.js-gallery');
const jsLightboxRef = document.querySelector('.js-lightbox');
const lightboxBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const lightboxImgRef = document.querySelector('.lightbox__image');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
let currentIndex;
//createGallery
const createGallery = item => {
  const liRef = document.createElement('li');
  liRef.classList.add('gallery__item');
  const aRef = document.createElement('a');
  aRef.classList.add('gallery__link');
  aRef.href = item.original;
  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.setAttribute('src', item.preview);
  imageRef.setAttribute('data-source', item.original);
  imageRef.setAttribute('data-index', galleryItems.indexOf(item));
  imageRef.setAttribute('alt', item.description);
  liRef.appendChild(aRef);
  aRef.appendChild(imageRef);

  return liRef;
};
const gallery = galleryItems.map(item => createGallery(item));
galleryRef.append(...gallery);

// URL
const urlsArr = galleryItems.map(item => item.original);

//Modal
const onOpenModal = () => {
  jsLightboxRef.classList.add('is-open');
  document.addEventListener('keydown', onPressEsc);
  document.addEventListener('keydown', onPressArrowLeftRigth);
};
const onCloseModal = () => {
  jsLightboxRef.classList.remove('is-open');
  lightboxImgRef.setAttribute('src', '');
  document.removeEventListener('keydown', onPressEsc);
  document.removeEventListener('keydown', onPressArrowLeftRigth);
};
const onImgClick = event => {
  event.preventDefault();
  if (event.target.tagName !== 'IMG') {
    return;
  }
  onOpenModal();
  lightboxImgRef.src = event.target.dataset.source;
  currentIndex = event.target.dataset.index;
};
const onPressArrowLeftRigth = event => {
  if (event.code === 'ArrowRight') {
    if (currentIndex >= urlsArr.length - 1) {
      //currentIndex = -1;
      return;
    }
    currentIndex = Number(currentIndex) + 1;
    lightboxImgRef.src = galleryItems[currentIndex].original;
  }
  if (event.code === 'ArrowLeft') {
    if (currentIndex <= 0) {
      // currentIndex = urlsArr.length;
      return;
    }
    currentIndex = Number(currentIndex) - 1;
    lightboxImgRef.src = galleryItems[currentIndex].original;
  }
};

const onPressEsc = event => {
  if (event.code === 'Escape') {
    onCloseModal();
    return;
  }
};

galleryRef.addEventListener('click', onImgClick);
lightboxBtnRef.addEventListener('click', onCloseModal);
lightboxOverlayRef.addEventListener('click', onCloseModal);
