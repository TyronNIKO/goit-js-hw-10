'use strict';

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

class Timer {
	refs = {
		input: document.querySelector('input#datetime-picker'),
		start: document.querySelector('[data-start]'),
		days: document.querySelector('[data-days]'),
		hours: document.querySelector('[data-hours]'),
		minutes: document.querySelector('[data-minutes]'),
		seconds: document.querySelector('[data-seconds]'),
	};
	constructor() {}
	convertMs(ms) {
		// Number of milliseconds per unit of time
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;
		const day = hour * 24;

		// Remaining days
		const days = Math.floor(ms / day);
		// Remaining hours
		const hours = Math.floor((ms % day) / hour);
		// Remaining minutes
		const minutes = Math.floor(((ms % day) % hour) / minute);
		// Remaining seconds
		const seconds = Math.floor((((ms % day) % hour) % minute) / second);

		return { days, hours, minutes, seconds };
	}
	validateTime(current, selected) {
		let valid = false;
		if (current < selected) {
			valid = true;
		}
		return valid;
	}
	addLeadingZero(value) {
		console.log(value);
		// let formated = String(value).padStart(2, '0');
		let formated = value < 10 ? '0' + value : value;
		return formated;
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
	init() {
		this.refs.start.setAttribute('disabled', '');
		this.refs.start.addEventListener('click', e => {
			e.preventDefault();
			console.log(e.target);
			const currDate = Date.now();
			console.log(currDate);
		});
	}
}
const timer = new Timer();

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		console.log(selectedDates[0]);
		const validation = timer.validateTime(
			options.defaultDate,
			selectedDates[0]
		);
		if (validation) {
			const diff = selectedDates[0] - options.defaultDate;
			timer.renderTimer(timer.convertMs(diff));
		} else {
			iziToast.error({
				position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
				title: 'Error',
				message: 'Please choose a date in the future',
			});
		}
	},
};

timer.init();

const picker = flatpickr(timer.refs.input, options);
console.log(picker);
