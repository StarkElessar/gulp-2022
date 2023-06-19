/**
 * Модуль параллакса мышью
 * (c) Фрилансер по жизни, Хмурый Кот
 * Документация:
 *
 * Предмету, который будет двигаться за мышью указать атрибут data-prlx-mouse.
 *
 * Если нужны дополнительные настройки - указать
 * Атрибут											      Значение по умолчанию
 * ----------------------------------------------------------------------------------------------------------
 * data-prlx-cx="коэффициент_х"				100							      значение больше - меньше процент сдвига
 * data-prlx-cy="коэффициент_y"				100							      значение больше - меньше процент сдвига
 * data-prlx-dxr																		        против оси X
 * data-prlx-dyr																		        против оси Y
 * data-prlx-a="скорость_анимации"		50							      больше значение - больше скорость
 *
 * Если нужно считывать движение мыши в блоке-родителе - тому родителю указать атрибут data-prlx-mouse-wrapper
 * Если в параллаксе картинка - расстянуть ее на >100%.
 * Например: {
 *  width: 130%;
 * 	height: 130%;
 * 	top: -15%;
 * 	left: -15%;
 * }
 * */
class MousePRLX {
  constructor(props) {
    const defaultConfig = {
      init: true,
    };

    this.config = Object.assign(defaultConfig, props);

    if (this.config.init) {
      const paralaxElements = document.querySelectorAll('[data-prlx-mouse]');

      if (paralaxElements.length) {
        this.init(paralaxElements);
      }
    }
  }

  init(paralaxElements) {
    paralaxElements.forEach((element) => {
      const paralaxMouseWrapper = element.closest('[data-prlx-mouse-wrapper]');

      /** Коэффициент X */
      const paramСoefficientX = element.dataset.prlxCx
        ? Number(element.dataset.prlxCx)
        : 100;

      /** Коэффициент. У */
      const paramСoefficientY = element.dataset.prlxCy
        ? Number(element.dataset.prlxCy)
        : 100;

      /** Направление Х и Y */
      const directionX = element.hasAttribute('data-prlx-dxr') ? -1 : 1;
      const directionY = element.hasAttribute('data-prlx-dyr') ? -1 : 1;

      /** Скорость анимации */
      const paramAnimation = element.dataset.prlxA
        ? Number(element.dataset.prlxA)
        : 50;

      let positionX = 0;
      let positionY = 0;
      let coordXPercent = 0;
      let coordYPercent = 0;

      setMouseParallaxStyle();

      /** Проверка на наличие родителя, в котором будет считываться положение мыши */
      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper);
      } else {
        mouseMoveParalax();
      }

      function setMouseParallaxStyle() {
        positionX += ((coordXPercent - positionX) * paramAnimation) / 1000;
        positionY += ((coordYPercent - positionY) * paramAnimation) / 1000;

        const transformX = (directionX * positionX) / (paramСoefficientX / 10);
        const transformY = (directionY * positionY) / (paramСoefficientY / 10);

        element.style.transform = `translate3D(${transformX}%, ${transformY}%, 0)`;

        requestAnimationFrame(setMouseParallaxStyle);
      }

      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener('mousemove', ({ clientX, clientY }) => {
          const offsetTop =
            element.getBoundingClientRect().top + window.scrollY;

          if (
            offsetTop >= window.scrollY ||
            offsetTop + element.offsetHeight >= window.scrollY
          ) {
            /** Получение ширины и высоты блока */
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;

            /** Ноль посередине */
            const coordX = clientX - parallaxWidth / 2;
            const coordY = clientY - parallaxHeight / 2;

            /** Получение значений координат в процентах */
            coordXPercent = (coordX / parallaxWidth) * 100;
            coordYPercent = (coordY / parallaxHeight) * 100;
          }
        });
      }
    });
  }
}

export default MousePRLX;
