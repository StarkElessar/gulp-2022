import gulp from 'gulp';
import del from 'del';
import zipPlugin from 'gulp-zip';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const zip = () => {
  del(`./${filePaths.projectDirName}.zip`).then(() => {
    console.log('Папка ZIP успешно удалена');
  });

  return gulp
    .src(`${filePaths.buildFolder}/**/*.*`, {})
    .pipe(plugins.handleError('ZIP'))
    .pipe(zipPlugin(`${filePaths.projectDirName}.zip`))
    .pipe(gulp.dest('./'));
};

export { zip };