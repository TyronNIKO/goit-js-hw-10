'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Timer {
	constructor() {
		this.refs = {
			input: document.querySelector('input#datetime-picker'),
			start: document.querySelector('[data-start]'),
			days: document.querySelector('[data-days]'),
			hours: document.querySelector('[data-hours]'),
			minutes: document.querySelector('[data-minutes]'),
			seconds: document.querySelector('[data-seconds]'),
		};
		this.futureDate = null;
	}
	convertMs(ms) {
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;
		const days = Math.floor(ms / day);
		const hours = Math.floor((ms % day) / hour);
		const minutes = Math.floor(((ms % day) % hour) / minute);
		const seconds = Math.floor((((ms % day) % hour) % minute) / second);
		return { days, hours, minutes, seconds };
	}
	validateTime(current, selected) {
		return current < selected;
	}
	addLeadingZero(value) {
		// return value < 10 ? '0' + value : value;
		return String(value).padStart(2, '0');
	}
	// renderTimer({ days, hours, minutes, seconds }) {
	// 	this.refs.days.innerText = this.addLeadingZero(days);
	// 	this.refs.hours.innerText = this.addLeadingZero(hours);
	// 	this.refs.minutes.innerText = this.addLeadingZero(minutes);
	// 	this.refs.seconds.innerText = this.addLeadingZero(seconds);
	// }
	renderTimer(obj) {
		const keys = Object.keys(obj);
		keys.forEach(key => {
			this.refs[key].innerText = this.addLeadingZero(obj[key]);
		});
	}
	newInterval(time, delay) {
		const interval = setInterval(() => {
			let currentTime = Date.now();
			const remainingTime = time - currentTime;
			if (remainingTime >= 0) {
				this.renderTimer(this.convertMs(remainingTime));
			} else {
				iziToast.info({
					timeout: 10000,
					position: 'topCenter',
					title: 'Info',
					message: 'Time expired. Input has been reset!',
				});
				clearInterval(interval);
				this.refs.input.removeAttribute('disabled');
				this.refs.start.removeAttribute('disabled');
			}
		}, delay);
	}
	init() {
		this.refs.start.setAttribute('disabled', '');
		this.refs.start.addEventListener('click', e => {
			e.preventDefault();
			this.newInterval(this.futureDate, 1000);
			this.refs.input.setAttribute('disabled', '');
			this.refs.start.setAttribute('disabled', '');
		});
	}
}
const timer = new Timer();

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	locale: Ukrainian, // locale for this instance only
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		const validation = timer.validateTime(Date.now(), selectedDates[0]);
		if (validation) {
			const diff = selectedDates[0] - Date.now();
			timer.renderTimer(timer.convertMs(diff));
			timer.refs.start.removeAttribute('disabled');
			timer.futureDate = selectedDates[0].getTime();
		} else {
			iziToast.error({
				iconUrl: './img/icons/icon-error.svg',
				position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
				title: 'Error',
				message: 'Please choose a date in the future',
			});
		}
	},
};

timer.init();

flatpickr(timer.refs.input, options);
