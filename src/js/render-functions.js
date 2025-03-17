import SimpleLightbox from 'simplelightbox';
export const renderImage = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-img" src="${webformatURL}" alt="${tags}" width ="360"/>
        </a>
        <ul class="gallery-list-info">
          <li class="gallery-list-info-item">
            <h3 class="gallery-list-info-title">Likes</h3>
            <p class="gallery-list-info-subtitle">${likes}</p>
          </li>
          <li class="gallery-list-info-item">
            <h3 class="gallery-list-info-title">Views</h3>
            <p class="gallery-list-info-subtitle">${views}</p>
          </li>
          <li class="gallery-list-info-item">
            <h3 class="gallery-list-info-title">Comments</h3>
            <p class="gallery-list-info-subtitle">${comments}</p>
          </li>
          <li class="gallery-list-info-item">
            <h3 class="gallery-list-info-title">Downloads</h3>
            <p class="gallery-list-info-subtitle">${downloads}</p>
          </li>
        </ul>      
      </li>
    `;
};
export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const updateGallery = (galleryRef, images) => {
  galleryRef.innerHTML = images.map(renderImage).join('');
  lightbox.refresh();
};
