class Popup {
  constructor() {
    this.html = document.documentElement;
    this.body = document.body;
    this.pageWrapper = document.querySelector('.page');
    this.lockPaddingElements = document.querySelectorAll('[data-lp]');
  }

  /**
   * Toggle body lock to prevent scrolling.
   * @param {boolean} isLock - Indicates whether to lock the body or unlock it.
   */
  toggleBodyLock(isLock) {
    const lockPaddingValue = window.innerWidth - this.pageWrapper.offsetWidth;

    setTimeout(
      () => {
        if (this.lockPaddingElements) {
          this.lockPaddingElements.forEach((element) => {
            element.style.paddingRight = isLock
              ? `${lockPaddingValue}px`
              : '0px';
          });
        }

        this.body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
        this.body.classList.toggle('lock', isLock);
      },
      isLock ? 0 : 500
    );
  }
}

export default Popup;