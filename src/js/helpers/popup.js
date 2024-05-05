export class Popup {
	constructor() {
		this.html = document.documentElement;
		this.body = document.body;
	}

	/**
	 * Toggles the body lock to prevent scrolling when opening modal windows.
	 * Call toggleBodyLock(true) to open a modal window.
	 * Call toggleBodyLock(false) to close a modal window.
	 *
	 * @param {boolean} isLock - Indicates whether to lock the body or unlock it.
	 */
	toggleBodyLock(isLock) {
		this.html.classList.toggle('lock', isLock);
	}
}
