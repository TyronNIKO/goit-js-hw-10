'use strict';

import images from './images.js';
import Gallery from './Gallery.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = new Gallery(images, '.gallery');
gallery.init();
const options = {
	captionDelay: 250,
};
const simp = new SimpleLightbox('.gallery a', options);
console.log(simp);
