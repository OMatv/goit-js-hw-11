import axios from 'axios';

export async function fetchImages(query, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '43289261-b2f679df5fe28faf218337d96',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        captions: true,
        page: page,
        per_page: 15,
      },
    });

    return response.data.hits;
  } catch (error) {
    throw new Error('Failed to fetch images from Pixabay API');
  }
}
