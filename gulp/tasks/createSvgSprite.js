import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { logger } from "../config/Logger.js";

const createSvgSprite = () => {
  return gulp.src(filePaths.src.svgIcons, {})
    .pipe(logger.handleError('COPY ROOT FILES'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg',

            /** Создавать страницу с перечнем иконок */
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest(filePaths.build.images));
};

export { createSvgSprite };
