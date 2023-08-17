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
import { ftp } from './gulp/tasks/ftp.js';

const isBuild = process.argv.includes('--build');

/**
 * File change watcher:
 */
function watcher() {
	gulp.watch(filePaths.watch.static, copy);
	gulp.watch(filePaths.watch.html, html.bind(null, isBuild));
	gulp.watch(filePaths.watch.scss, scss.bind(null, isBuild));
	gulp.watch(filePaths.watch.js, javaScript.bind(null, !isBuild));
	gulp.watch(filePaths.watch.images, images.bind(null, isBuild));
}

/**
 * Serial font processing:
 * */
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

/**
 * Parallel tasks in development mode:
 * */
const devTasks = gulp.parallel(
	copy,
	copyRootFiles,
	html.bind(null, isBuild),
	scss.bind(null, isBuild),
	javaScript.bind(null, !isBuild),
	images.bind(null, isBuild)
);

/**
 * Main tasks:
 * */
const mainTasks = gulp.series(fonts, devTasks);

/**
 * Building of scripts to complete tasks:
 * */
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

/**
 * Building default mode:
 * */
gulp.task('default', dev);

/**
 * Export scripts:
 * */
export { dev, build, deployZIP, deployFTP, createSvgSprite };
