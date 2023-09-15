import gulp from 'gulp';
import { filePaths } from './gulp/config/paths.js';

/**
 * Импорт задач
 */
import { copy } from './gulp/tasks/copy.js';
import { copyRootFiles } from './gulp/tasks/copyRootFiles.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { javaScript } from './gulp/tasks/javaScript.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontStyle } from './gulp/tasks/fonts.js';
import { createSvgSprite } from './gulp/tasks/createSvgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftpDeploy } from './gulp/tasks/ftpDeploy.js';

const isBuild = process.argv.includes('--build');
const handleHTML = html.bind(null, isBuild);
const handleSCSS = scss.bind(null, isBuild);
const handleJS = javaScript.bind(null, !isBuild);
const handleImages = images.bind(null, isBuild);

/**
 * Наблюдатель за изменениями в файлах
 */
function watcher() {
  gulp.watch(filePaths.watch.static, copy);
  gulp.watch(filePaths.watch.html, handleHTML);
  gulp.watch(filePaths.watch.scss, handleSCSS);
  gulp.watch(filePaths.watch.js, handleJS);
  gulp.watch(filePaths.watch.images,handleImages);
}

/**
 * Последовательная обработка шрифтов
 * */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

/**
 * Параллельные задачи в режиме разработки
 * */
const devTasks = gulp.parallel(copy, copyRootFiles, createSvgSprite, handleHTML, handleSCSS, handleJS, handleImages);

/**
 * Основные задачи
 * */
const mainTasks = gulp.series(fonts, devTasks);

/**
 * Построение сценариев выполнения задач
 * */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftpDeploy);

/**
 * Выполнение сценария по умолчанию
 * */
gulp.task('default', dev);

/**
 * Экспорт сценариев
 * */
export { dev, build, deployZIP, deployFTP, createSvgSprite };
