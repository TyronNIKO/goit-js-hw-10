'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const el = document.querySelector('form.form');
el.addEventListener('submit', e => {
	e.preventDefault();
	// console.log(e.target);
	// console.log(e.submitter);
	// console.log(el.elements.delay.value);
	const delay = el.elements.delay.value;
	// console.log(el.elements.state.value);
	const state = el.elements.state.value;
	createPromise(state, delay);
});
function createPromise(state, delay) {
	console.log('createPromise', state, delay);
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			switch (state) {
				case 'fulfilled':
					resolve('Success! Value passed to resolve function');
					break;
				case 'rejected':
					reject('Error! Error passed to reject function');
					break;
				default:
					break;
			}
		}, delay);
	});
	promise
		.then(state => {
			console.log(state);
			iziToast.success({
				timeout: 90000,
				position: 'topRight',
				message: `Fulfilled promise in ${delay}ms`,
			});
		}) // "Success! Value passed to resolve function"
		.catch(error => {
			console.log(error);
			iziToast.error({
				timeout: 90000,
				position: 'topRight',
				message: `Rejected promise in ${delay}ms`,
			});
		}) // "Error! Error passed to reject function"
		.finally(() => console.log('Promise settled')); // "Promise
}
