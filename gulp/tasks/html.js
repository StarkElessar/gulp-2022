import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from "../config/Logger.js";

const html = (isBuild) => {
  return gulp.src(filePaths.src.html)
    .pipe(logger.handleError('HTML'))
    .pipe(fileInclude())
    .pipe(plugins.replace(/@img\//g, 'images/'))
    .pipe(plugins.if(isBuild, webpHtml()))
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        removeComments: isBuild,

        /** Раскомментировать если требуется минификация html */
        //collapseWhitespace: isBuild,
      })
    )
    .pipe(
      plugins.if(
        isBuild,
        versionNumber({
          value: '%DT%',

          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },

          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(gulp.dest(filePaths.buildFolder))
    .pipe(plugins.browserSync.stream());
};

export { html };
