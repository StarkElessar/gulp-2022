/**
 * Модуль параллакса мышью
 * (c) Фрилансер по жизни, Хмурый Кот
 * Документация:

Предмету, который будет двигаться за мышью указать атрибут data-prlx-mouse.
==========================================================================================================
Если нужны дополнительные настройки - указать
Атрибут											Значение по умолчанию
----------------------------------------------------------------------------------------------------------
data-prlx-cx="коэффициент_х"					100							значение больше - меньше процент сдвига
data-prlx-cy="коэффициент_y"					100							значение больше - меньше процент сдвига
data-prlx-dxr																		      против оси X
data-prlx-dyr																		      против оси Y
data-prlx-a="скорость_анимации"				50							больше значение - больше скорость
===========================================================================================================
Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse-wrapper
Если в параллаксе картинка - расстянуть ее на >100%. 
Например:
	width: 130%;
	height: 130%;
	top: -15%;
	left: -15%;
*/
export class MousePRLX {
  constructor(props, data = null) {
    const defaultConfig = {
      init: true,
    };

    this.config = Object.assign(defaultConfig, props);

    if (this.config.init) {
      const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');

      if (paralaxMouse.length) {
        this.init(paralaxMouse);
      }
    }
  }

  init(paralaxMouse) {
    paralaxMouse.forEach((element) => {
      const paralaxMouseWrapper = element.closest('[data-prlx-mouse-wrapper]');

      // Коэф. X
      const paramСoefficientX = element.dataset.prlxCx
        ? Number(element.dataset.prlxCx)
        : 100;
      // Коэф. У
      const paramСoefficientY = element.dataset.prlxCy
        ? Number(element.dataset.prlxCy)
        : 100;
      // Напр. Х
      const directionX = element.hasAttribute('data-prlx-dxr') ? -1 : 1;
      // Напр. У
      const directionY = element.hasAttribute('data-prlx-dyr') ? -1 : 1;
      // Скорость анимации
      const paramAnimation = element.dataset.prlxA
        ? Number(element.dataset.prlxA)
        : 50;

      // Объявление переменных
      let positionX = 0;
      let positionY = 0;
      let coordXprocent = 0;
      let coordYprocent = 0;

      setMouseParallaxStyle();

      // Проверяю на наличие родителя, в котором будет считываться положение мыши
      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper);
      } else {
        mouseMoveParalax();
      }

      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX;
        const distY = coordYprocent - positionY;

        positionX = positionX + (distX * paramAnimation) / 1000;
        positionY = positionY + (distY * paramAnimation) / 1000;

        element.style.cssText = `transform: translate3D(${
          (directionX * positionX) / (paramСoefficientX / 10)
        }%,${(directionY * positionY) / (paramСoefficientY / 10)}%, 0);`;

        requestAnimationFrame(setMouseParallaxStyle);
      }

      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener('mousemove', (event) => {
          const offsetTop =
            element.getBoundingClientRect().top + window.scrollY;

          if (
            offsetTop >= window.scrollY ||
            offsetTop + element.offsetHeight >= window.scrollY
          ) {
            // Получение ширины и высоты блока
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;
            // Ноль по середине
            const coordX = event.clientX - parallaxWidth / 2;
            const coordY = event.clientY - parallaxHeight / 2;
            // Получаем проценты
            coordXprocent = (coordX / parallaxWidth) * 100;
            coordYprocent = (coordY / parallaxHeight) * 100;
          }
        });
      }
    });
  }
}