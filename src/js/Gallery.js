export default class Gallery {
	constructor(array, selector) {
		this.items = array;
		this.parent = document.querySelector(selector);
	}
	createElement(src, full, alt) {
		const imageElement = `<li class="gallery-item"><a class="gallery-link" href="${full}"><img class="gallery-image" src="${src}" alt="${alt}" title="${alt}"/></a></li>`;
		return imageElement;
	}
	renderGallery(array) {
		const gallery = array
			.map(({ preview, original, description }) =>
				this.createElement(preview, original, description)
			)
			.join(''); //прибрали кому при обєднанні масиву
		this.parent.innerHTML = gallery;
	}
	init() {
		// this.parent.addEventListener('click', e => {
		// 	e.preventDefault();
		// 	console.dir(e.target.parentNode);
		// });
		this.renderGallery(this.items);
	}
}
