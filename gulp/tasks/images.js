import gulp from 'gulp';
import webp from 'gulp-webp';
import imageMin from 'gulp-imagemin';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { isBuild } from '../../gulpfile.js';

const images = () => {
  return gulp
    .src(filePaths.src.images)
    .pipe(plugins.handleError('IMAGES'))
    .pipe(plugins.newer(filePaths.build.images))
    .pipe(plugins.if(isBuild, webp()))
    .pipe(plugins.if(isBuild, gulp.dest(filePaths.build.images)))
    .pipe(plugins.if(isBuild, gulp.src(filePaths.src.images)))
    .pipe(plugins.if(isBuild, plugins.newer(filePaths.build.images)))
    .pipe(
      plugins.if(
        isBuild,
        imageMin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3, // 0 to 7
        })
      )
    )
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(gulp.src(filePaths.src.svg))
    .pipe(gulp.dest(filePaths.build.images))
    .pipe(plugins.browserSync.stream());
};

export { images };