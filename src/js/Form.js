'use strict';
export default class Form {
	formData = { email: '', message: '' };
	errorMessage = [];
	constructor(selector, lsKey) {
		this.form = document.querySelector(selector);
		this.lsKey = lsKey;
	}
	loadFormData() {
		const data = this.readLS(this.lsKey);
		if (!data) return;
		const keys = Object.keys(data);
		keys.forEach(key => {
			this.form.elements[key].value = data[key];
		});
	}
	collectInputsValue(form) {
		const formData = new FormData(form);
		const data = {};
		formData.forEach(item => console.log(item));
		for (const [key, value] of formData) {
			data[key] = value.trim();
		}
		return data;
	}
	validation(form) {
		let valid = [];
		const formData = new FormData(form);
		for (const [key, value] of formData) {
			if (value.trim() === '') {
				valid.push(false);
			} else {
				valid.push(true);
			}
		}
		this.errorMessage = 'Fill please all fields';
		return valid;
	}
	writeLS(key, obj) {
		const string = JSON.stringify(obj);
		localStorage.setItem(key, string);
	}
	readLS(key) {
		const data = localStorage.getItem(key);
		return JSON.parse(data);
	}
	init() {
		this.loadFormData();
		this.form.addEventListener('input', e => {
			const data = this.collectInputsValue(this.form);
			this.formData = data;
			this.writeLS(this.lsKey, data);
		});
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			const text = e.submitter.innerText;
			const validation = this.validation(this.form);
			if (!validation.includes(false)) {
				e.submitter.innerText = 'Form submited';
				e.submitter.disabled = true;
				console.log(this.formData);
				this.form.reset();
				localStorage.clear();
			} else {
				alert(this.errorMessage ?? 'Error');
			}
			setTimeout(() => {
				e.submitter.innerText = text;
				e.submitter.disabled = false;
			}, 5000);
		});
	}
}
