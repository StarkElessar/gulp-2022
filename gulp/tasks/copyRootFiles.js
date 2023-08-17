import gulp from 'gulp';
import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';

const copyRootFiles = () => {
  const config = {
    dot: true,
    allowEmpty: true,
  };

  /** Добавляем файлы, которые нужны в корне проекта */
  const files = ['favicon.ico', '.htaccess'];

  return gulp
    .src(plugins.concat(filePaths.srcFolder, files), config)
    .pipe(gulp.dest(filePaths.buildFolder));
};

export { copyRootFiles };