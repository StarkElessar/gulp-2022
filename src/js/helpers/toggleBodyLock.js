import { body, lockPaddingElements, pageWrapper } from './elementsNodeList';

/**
 * Toggles the body lock to prevent scrolling when opening modal windows.
 * Call toggleBodyLock(true) to open a modal window.
 * Call toggleBodyLock(false) to close a modal window.
 *
 * @param {boolean} isLock - Indicates whether to lock the body or unlock it.
 */
const toggleBodyLock = (isLock) => {
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;

  setTimeout(
    () => {
      if (lockPaddingElements) {
        lockPaddingElements.forEach((element) => {
          element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
        });
      }

      body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
      body.classList.toggle('lock', isLock);
    },
    isLock ? 0 : 500
  );
};

export default toggleBodyLock;