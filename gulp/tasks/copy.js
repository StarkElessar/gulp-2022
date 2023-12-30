import gulp from 'gulp';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/logger.js";

const copy = () => {
  return gulp.src(filePaths.src.static)
    .pipe(logger.handleError('COPY'))
    .pipe(gulp.dest(filePaths.build.static));
};

export { copy };