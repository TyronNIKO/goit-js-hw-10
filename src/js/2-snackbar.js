'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import success from '/img/icons/success.svg';
import error from '/img/icons/icon-error.svg';

const icons = {
	success,
	error,
};
const el = document.querySelector('form.form');
el.addEventListener('submit', e => {
	e.preventDefault();
	const delay = el.elements.delay.value;
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
				iconUrl: icons.success,
				timeout: 5000,
				position: 'topRight',
				title: 'Fulfilled',
				message: `promise in ${delay}ms`,
			});
		}) // "Success! Value passed to resolve function"
		.catch(error => {
			console.log(error);
			iziToast.error({
				iconUrl: icons.error,
				timeout: 5000,
				position: 'topRight',
				title: 'Rejected',
				message: ` promise in ${delay}ms`,
			});
		}) // "Error! Error passed to reject function"
		.finally(() => console.log('Promise settled')); // "Promise
}
