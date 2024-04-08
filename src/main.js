import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#search-input');
  const loader = document.querySelector('.loader');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const searchTerm = input.value.trim();

    if (!searchTerm) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term',
        position: 'topRight',
      });
      return;
    }

    clearGallery();
    loader.classList.add('visible');

    try {
      const images = await fetchImages(searchTerm);

      if (images.length === 0) {
        iziToast.info({
          title: 'Info',
          message: 'No images found. Please try again!',
          position: 'topRight',
        });
      } else {
        renderImages(images);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
        position: 'topRight',
      });
    } finally {
      loader.classList.remove('visible');
    }
  });
});
