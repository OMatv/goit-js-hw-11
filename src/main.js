import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = document.querySelector('#search-input');
  const gallery = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');

  let currentPage = 1;
  let currentQuery = '';

  async function loadMoreImages() {
    loader.classList.add('visible');
    try {
      const images = await fetchImages(currentQuery, currentPage);
      if (images.length === 0) {
        iziToast.info({
          title: 'Info',
          message: 'No more images to load.',
          position: 'topRight',
        });
        return;
      }
      renderImages(images);
      currentPage++;
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
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
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
    currentQuery = searchTerm;
    currentPage = 1;
    await loadMoreImages();
  }

  form.addEventListener('submit', handleSearchSubmit);

  // Intersection Observer to load more images when scrolling to the bottom
  const observer = new IntersectionObserver(
    async entries => {
      if (entries[0].isIntersecting) {
        await loadMoreImages();
      }
    },
    { threshold: 0 }
  );

  observer.observe(loader);
});
