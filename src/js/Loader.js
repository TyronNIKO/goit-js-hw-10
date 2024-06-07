export default class Loader {
	html = `<div id="loader" ><div class="spinner center"></div></div>`;
	init() {
		const body = document.querySelector('body');
		const loader = document.querySelector('#loader');
		body.insertAdjacentHTML('afterbegin', this.html);
		document.onreadystatechange = function () {
			if (document.readyState !== 'complete') {
				body.style.visibility = 'hidden';
				loader.style.visibility = 'visible';
			} else {
				loader.style.display = 'none';
				body.style.visibility = 'visible';
			}
		};
	}
}
