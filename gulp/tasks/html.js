import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import webpHtml from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';

const html = () => {
  return gulp
    .src(filePaths.src.html)
    .pipe(plugins.handleError('HTML'))
    .pipe(fileInclude())
    .pipe(plugins.replace(/@img\//g, 'images/'))
    .pipe(plugins.if(app.isBuild, webpHtml()))
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        removeComments: app.isBuild,

        /** Раскомментировать если требуется минификация html */
        //collapseWhitespace: app.isBuild,
      })
    )
    .pipe(
      plugins.if(
        app.isBuild,
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
    .pipe(gulp.dest(filePaths.build.html))
    .pipe(plugins.browserSync.stream());
};

export { html };
