/**
 * Класс для проверки мобильного браузера.
 */
class MobileChecker {
  static userAgent = navigator.userAgent;

  /**
   * Проверяет, является ли устройство Android.
   * @returns {boolean} true, если устройство Android, в противном случае false.
   */
  static get isAndroid() {
    return Boolean(this.userAgent.match(/Android/i));
  }

  /**
   * Проверяет, является ли устройство BlackBerry.
   * @returns {boolean} true, если устройство BlackBerry, в противном случае false.
   */
  static get isBlackBerry() {
    return Boolean(this.userAgent.match(/BlackBerry/i));
  }

  /**
   * Проверяет, является ли устройство iOS (iPhone, iPad или iPod).
   * @returns {boolean} true, если устройство iOS, в противном случае false.
   */
  static get isAppleOS() {
    return Boolean(this.userAgent.match(/iPhone|iPad|iPod/i));
  }

  /**
   * Проверяет, является ли устройство Opera Mini.
   * @returns {boolean} true, если устройство Opera Mini, в противном случае false.
   */
  static get isOpera() {
    return Boolean(this.userAgent.match(/Opera Mini/i));
  }

  /**
   * Проверяет, является ли устройство Windows.
   * @returns {boolean} true, если устройство Windows, в противном случае false.
   */
  static get isWindows() {
    return Boolean(this.userAgent.match(/IEMobile/i));
  }

  /**
   * Проверяет, является ли устройство любым из поддерживаемых типов (Android, BlackBerry, iOS, Opera Mini, Windows).
   * @returns {boolean} true, если устройство является любым из поддерживаемых типов, в противном случае false.
   */
  static get isAny() {
    return (
      MobileChecker.isAndroid ||
      MobileChecker.isBlackBerry ||
      MobileChecker.isAppleOS ||
      MobileChecker.isOpera ||
      MobileChecker.isWindows
    );
  }
}

export default MobileChecker;
