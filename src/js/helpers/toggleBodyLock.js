import { body, lockPaddingElements, pageWrapper } from './elementsNodeList'
/*
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)
*/
const toggleBodyLock = (isLock) => {
  console.log(isLock);
  const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth

  setTimeout(() => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element) => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}

export default toggleBodyLock