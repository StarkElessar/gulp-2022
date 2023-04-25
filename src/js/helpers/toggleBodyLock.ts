import { body, lockPaddingElements, pageWrapper } from './elementsNodeList';
import { FLS } from './../modules';
/**
* Универсальная функция для блокировки скрола при открытии модальных окон
* При открытии модального окна вызываем: toggleBodyLock(true)
* При закрытии окна вызываем: toggleBodyLock(false)

* lockPaddingElements - это коллекция элементов с фиксированной позицией
* В html таким элементам нужно дать атрибут [data-lp] 
*/
const toggleBodyLock = (isLock: boolean): void => {
  FLS(`Попап ${isLock ? 'открыт' : 'закрыт'}`)
  const lockPaddingValue: number = window.innerWidth - pageWrapper.offsetWidth

  setTimeout((): void => {
    if (lockPaddingElements) {
      lockPaddingElements.forEach((element: HTMLElement): void => {
        element.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
      })
    }
  
    body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px'
    body.classList.toggle('lock', isLock)
  }, isLock ? 0 : 500)
}

export default toggleBodyLock;