export function isWebp() {
  // Проверка поддержки webp
  function testWebp(callback) {
    let webP = new Image()
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }
  // Добавление класса _webp или _no-webp для HTML 
  testWebp(function (support) {
    let className = support === true ? 'webp' : 'no-webp'
    document.documentElement.classList.add(className)
  })
}

export function windowPopup() {
  const burgerBtn = document.querySelector('.header__burger-btn')
  const popupMenu = document.querySelector('.popup-menu')

  burgerBtn.onclick = () => {
    popupMenu.classList.add('popup-menu_show')
  }

  popupMenu.onclick = (event) => {
    const target = event.target
    const wrapper = target.classList.contains('popup-menu')
    const closeBtn = target.closest('button')

    if (wrapper || closeBtn) {
      popupMenu.classList.remove('popup-menu_show')
    }
  }
}