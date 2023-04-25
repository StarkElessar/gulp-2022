import gulp from 'gulp'; // Основной модуль
import { filePaths } from './gulp/config/paths.js'; // Импорт путей
import { plugins } from './gulp/config/plugins.js'; // Импорт общих плагинов

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: filePaths,
  gulp,
  plugins,
};

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(filePaths.watch.static, copy);
  gulp.watch(filePaths.watch.html, html);
  gulp.watch(filePaths.watch.scss, scss);
  gulp.watch(filePaths.watch.js, js);
  gulp.watch(filePaths.watch.images, images);
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);
// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, copyRootFiles, html, scss, js, images)
);
// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Выполнение сценария по умолчанию
gulp.task('default', dev);

// Экспорт сценариев
export { dev, build, deployZIP, deployFTP, svgSprive };