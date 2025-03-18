import iziToast from 'izitoast';
import { getPhotos } from './js/pixabay-api';
import { updateGallery } from './js/render-functions';
import icon from './img/icon.svg';

const refs = {
  searchForm: document.querySelector('form'),
  searchInput: document.querySelector('[name="search-text"]'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loaderBox: document.querySelector('.loader-box'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let currentPage = 1;
let totalHits = 0;
let currentQuery = '';
let cardHeight = 0;
// * Loader
const showSbmLoader = () => refs.loader.classList.add('loader-submit');
const hideSbmLoader = () => refs.loader.classList.remove('loader-submit');
// * More Loader
const loaderBox = document.createElement('div');
const loaderElement = document.createElement('span');
loaderBox.appendChild(loaderElement);
loaderElement.classList.add('loader');
refs.gallery.insertAdjacentElement('afterend', loaderBox);
const showMoreLoader = () => loaderElement.classList.add('loader-more');
const hideMoreLoader = () => loaderElement.classList.remove('loader-more');
//
const showMoreBtn = () => refs.loadMoreBtn.classList.add('load-btn-visible');
const hideMoreBtn = () => refs.loadMoreBtn.classList.remove('load-btn-visible');
//
hideMoreBtn();
hideSbmLoader();
hideMoreLoader();

const smoothScroll = () => {
  const lastCard = refs.gallery.querySelector('.gallery-item:last-child');
  if (lastCard) {
    const { height } = lastCard.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
};

const handleSearchRequest = async () => {
  try {
    const data = await getPhotos(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        progressBarColor: '#B51B1B',
        position: 'topRight',
        iconUrl: icon,
      });
      return;
    }

    updateGallery(refs.gallery, data.hits);
    hideMoreLoader();
    totalHits = data.totalHits;

    console.log(data.hits);
    toggleLoadMore(totalHits, data.hits.length);
    if (currentPage > 1) {
      smoothScroll();
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: `${error}`,
      position: 'topRight',
      titleColor: '#ffffff',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      progressBarColor: '#B51B1B',
      position: 'topRight',
      iconUrl: icon,
    });
  } finally {
    hideSbmLoader();
  }
};

const toggleLoadMore = (totalHits, hitsLength) => {
  const perPage = 15;
  const totalPages = Math.ceil(totalHits / perPage);
  if (currentPage >= totalPages || hitsLength < perPage) {
    hideMoreBtn();
  } else {
    showMoreBtn();
  }
};

const onFormSubmit = event => {
  event.preventDefault();

  const formValue = refs.searchInput.value.trim();

  if (!formValue) {
    return;
  }
  showSbmLoader();
  currentQuery = formValue;
  currentPage = 1;
  refs.gallery.innerHTML = '';
  setTimeout(() => {
    handleSearchRequest();
  }, 500);
};

const onLoadMoreClick = () => {
  currentPage += 1;
  hideMoreBtn();
  showMoreLoader();
  setTimeout(() => {
    handleSearchRequest();
  }, 500);
};

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
