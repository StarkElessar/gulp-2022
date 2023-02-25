const html = document.documentElement as HTMLHtmlElement
const body = document.body as HTMLBodyElement
const pageWrapper = document.querySelector<HTMLDivElement>('.page')!
const header = document.querySelector<HTMLElement>('.header')
const firstScreen = document.querySelector<HTMLDivElement>('[data-observ]')
const burgerButton = document.querySelector<HTMLButtonElement>('.icon-menu')
const menu = document.querySelector<HTMLElement>('.menu')
const lockPaddingElements = document.querySelectorAll<HTMLElement>('[data-lp]')

export {
  html,
  body,
  pageWrapper,
  header,
  firstScreen,
  burgerButton,
  menu,
  lockPaddingElements,
}