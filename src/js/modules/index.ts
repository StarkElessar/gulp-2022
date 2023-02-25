import toggleBodyLock from '../helpers/toggleBodyLock'
import { html, firstScreen, header, burgerButton } from '../helpers/elementsNodeList'
import { EventWithTarget, IsMobile, TypeCallback } from '../types/typesModules'

// logger (Full Logging System) =================================================================================================================
function FLS(message: string): void {
  setTimeout(() => (window.FLS ? console.log(message) : null), 0)
}

// Проверка браузера на поддержку .webp изображений ======================================================
function isWebp() {
  // Проверка поддержки webp
  const testWebp = (callback: TypeCallback) => {
    const webP = new Image()

    webP.onload = webP.onerror = () => callback(webP.height === 2)
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebp((webpSupport: boolean) => {
    const className = webpSupport ? 'webp' : 'no-webp'
    html.classList.add(className)

    if (typeof FLS === 'function') {
      FLS(webpSupport ? 'webp поддерживается' : 'webp не поддерживается')
    }
  })
}

/* Проверка мобильного браузера */
const isMobile: IsMobile = {
  Android: () => navigator.userAgent.match(/Android/i),
  BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
  iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: () => navigator.userAgent.match(/Opera Mini/i),
  Windows: () => navigator.userAgent.match(/IEMobile/i),
  any: () =>
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOS() ||
    isMobile.Opera() ||
    isMobile.Windows(),
}

/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass(): void {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) {
    html.classList.add('touch')
  }
}

// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass(): void {
  window.addEventListener('load', () => {
    setTimeout(() => {
      html.classList.add('loaded')
    }, 0)
  })
}

// Получение хеша в адресе сайта
const getHash = (): string | undefined => {
  if (location.hash) {
    return location.hash.replace('#', '')
  }
}

// Указание хеша в адресе сайта
function setHash(hash: string): void {
  const newHash = hash ? `#${hash}` : location.href.split('#')[0]
  history.pushState('', '', newHash)
}

// Функция для фиксированной шапки при скролле =================================================================================================================
function headerFixed(): void {
  const headerStickyObserver = new IntersectionObserver(([entry]) => {
    header?.classList.toggle('sticky', !entry.isIntersecting)
  })

  if (firstScreen) {
    headerStickyObserver.observe(firstScreen)
  }
}

// Универсальная функция для открытия и закрытия попапо =================================================================================================================
const togglePopupWindows = (): void => {
  document.addEventListener('click', (event) => {
    const { target } = event as EventWithTarget
    
    if (target.closest('[data-type]')) {
      const popup = document.querySelector(
        `[data-popup="${target.dataset.type}"]`
      ) as HTMLElement | null

      if (document.querySelector('._is-open')) {
        document.querySelectorAll('._is-open').forEach((modal) => {
          modal.classList.remove('_is-open')
        })
      }

      popup?.classList.add('_is-open')
      toggleBodyLock(true)
    }

    if (target.classList.contains('_overlay-bg') || target.closest('.button-close')) {
      const popup = target.closest('._overlay-bg')

      popup?.classList.remove('_is-open')
      toggleBodyLock(false)
    }
  })
}

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
const menuInit = (): void => {
  if (burgerButton) {
    document.addEventListener('click', (event) => {
      const { target } = event as EventWithTarget

      if (target.closest('.icon-menu')) {
        html.classList.toggle('menu-open')
        toggleBodyLock(html.classList.contains('menu-open'))
      }
    })
  }
}
const menuOpen = (): void => {
  toggleBodyLock(true)
  html.classList.add('menu-open')
}
const menuClose = (): void => {
  toggleBodyLock(false)
  html.classList.remove('menu-open')
}

export {
  FLS,
  isWebp,
  isMobile,
  addTouchClass,
  headerFixed,
  togglePopupWindows,
  addLoadedClass,
  getHash,
  setHash,
  menuInit,
  menuOpen,
  menuClose,
}
