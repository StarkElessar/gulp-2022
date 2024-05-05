import { Popup } from '../helpers/popup';

export class PopupManager extends Popup {
	constructor(options = {}) {
		super();

		const defaultOptions = {
			isOpenClass: 'is-open',
			buttonCloseName: 'button-close',
		};

		this.options = Object.assign(defaultOptions, options);

		this.init();
		this.addEventListeners();
	}

	init() {
		this.popups.forEach((popup) => {
			popup.setAttribute('aria-hidden', 'true');
		});
	}

	addEventListeners() {
		document.addEventListener('click', this.togglePopup.bind(this));
	}

	togglePopup({ target }) {
		if (target.closest('[data-type]')) {
			const popup = this.getPopupBySelector(target.dataset.type);

			this.isOpenElements.forEach((modal) => this.closePopup(modal));
			this.openPopup(popup);
			this.toggleBodyLock(true);
		}

		if (
			target.hasAttribute('data-close-overlay') ||
			target.closest(`.${this.options.buttonCloseName}`)
		) {
			this.closePopup(target.closest('[data-popup]'));
			this.toggleBodyLock(false);
		}
	}

	getPopupBySelector(popupName) {
		return document.querySelector(`[data-popup="${popupName}"]`);
	}

	get popups() {
		return document.querySelectorAll('[data-popup]');
	}

	get isOpenElements() {
		return document.querySelectorAll(`.${this.options.isOpenClass}`);
	}

	openPopup(popup) {
		popup.classList.add(this.options.isOpenClass);
		popup.setAttribute('aria-hidden', 'false');
	}

	closePopup(popup) {
		popup.classList.remove(this.options.isOpenClass);
		popup.setAttribute('aria-hidden', 'true');
	}
}
