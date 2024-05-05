/**
 * @class Accordion
 * @description Represents an accordion component.
 * @param {string} selector - The CSS selector for the accordion container.
 * @param {object} options - The options for configuring the accordion.
 * @param {boolean} options.shouldOpenAll - Whether to keep previous items open or not. Default is false.
 * @param {number[]} options.defaultOpen - The set of initially open items. Default is an empty array.
 */
export class Accordion {
	constructor(selector, options = {}) {
		const defaultConfig = {
			shouldOpenAll: false,
			defaultOpen: [],
			collapsedClass: 'open',
		};

		this.options = Object.assign(defaultConfig, options);
		this.accordionSelector = selector;
		this.accordions = document.querySelectorAll(this.accordionSelector);

		this.init();
	}

	init() {
		document.addEventListener('click', ({ target }) => {
			const header = target.closest('.accordion__header');
			if (!header) return;

			const item = header.parentNode;
			const accordion = item.closest(this.accordionSelector);
			if (!accordion) return;

			const accordionItems = accordion.querySelectorAll('.accordion__item');

			this.toggle(item);

			if (this.isCollapsed(item) && !this.options.shouldOpenAll) {
				this.closeOthers(item, accordionItems);
			}
		});

		this.accordions.forEach((accordion) => {
			const accordionItems = accordion.querySelectorAll('.accordion__item');

			accordionItems.forEach((item, index) => {
				if (this.options.defaultOpen.includes(index)) {
					this.open(item);
				} else {
					this.close(item);
				}
			});
		});
	}

	toggle(element) {
		element.classList.toggle(this.options.collapsedClass);

		if (this.options.shouldOpenAll) {
			this.closeOthers(element);
		}
	}

	open(element) {
		element.classList.add(this.options.collapsedClass);
	}

	close(element) {
		element.classList.remove(this.options.collapsedClass);
	}

	closeOthers(currentItem, items) {
		for (const item of items) {
			if (item !== currentItem && this.isCollapsed(item)) {
				this.close(item);
			}
		}
	}

	isCollapsed(item) {
		return item.classList.contains(this.options.collapsedClass);
	}
}
