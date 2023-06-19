import MobileChecker from './MobileChecker.js';

class BaseHelpers {
  static html = document.documentElement;
  static header = document.querySelector('.header');
  static firstScreen = document.querySelector('[data-observ]');

  /**
   * Проверка браузера на поддержку .webp изображений
   * (i) необходимо для корректного отображения webp из css
   * */
  static checkWebpSupport() {
    /** Проверка поддержки webp */
    const testWebp = (callback) => {
      const webP = new Image();

      webP.onload = webP.onerror = () => callback(webP.height === 2);
      webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    /** Добавление класса _webp или _no-webp для HTML */
    testWebp((support) => {
      const className = support ? 'webp' : 'no-webp';
      this.html.classList.add(className);

      console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
    });
  }

  /**
   * Добавление класса touch для HTML если браузер мобильный
   * */
  static addTouchClass() {
    if (MobileChecker.isAny) {
      this.html.classList.add('touch');
    }
  }

  /**
   * Добавление loaded для HTML после полной загрузки страницы
   * */
  static addLoadedClass() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.html.classList.add('loaded');
      }, 0);
    });
  }

  /** Получение хеша в адресе сайта */
  static get getHash() {
    return location.hash?.replace('#', '');
  }

  /** Указание хеша в адресе сайта */
  static setHash(hash) {
    hash = hash ? `#${hash}` : location.href.split('#')[0];
    history.pushState('', '', hash);
  }

  /** Функция для фиксированной шапки при скролле */
  static headerFixed() {
    const headerStickyObserver = new IntersectionObserver(([entry]) => {
      this.html.classList.toggle('header-is-sticky', !entry.isIntersecting);
    });

    if (this.firstScreen) {
      headerStickyObserver.observe(this.firstScreen);
    }
  }
}

export default BaseHelpers;
