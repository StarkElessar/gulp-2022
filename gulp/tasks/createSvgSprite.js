import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';

import { filePaths } from '../config/paths.js';
import { plugins } from '../config/plugins.js';

const createSvgSprite = () => {
  return gulp
    .src(filePaths.src.svgIcons, {})
    .pipe(plugins.handleError('SVG'))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg',

            /** Create a page with a list of icons */
            example: true,
          },
        },
      })
    )
    .pipe(gulp.dest(filePaths.build.images));
};

export { createSvgSprite };
