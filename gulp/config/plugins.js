import replace from 'gulp-replace' // Поиск и замена
import plumber from 'gulp-plumber' // Обработка ошибок
import notify from 'gulp-notify' // Сообщения (подсказки)
import browserSync from 'browser-sync' // Локальный сервер
import newer from 'gulp-newer' // Проверка обновления
import ifPlugin from 'gulp-if' // Условное ветление

export const plugins = {
  if: ifPlugin,
  replace,
  plumber,
  notify,
  browserSync,
  newer,
}