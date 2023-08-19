import gulp from 'gulp';
import webpack from 'webpack-stream';
import { webpackConfig } from '../../webpack.config.js';

import { plugins } from '../config/plugins.js';
import { filePaths } from '../config/paths.js';
import { logger } from "../config/Logger.js";

const javaScript = (isDev) => {
  return gulp.src(filePaths.src.js, { sourcemaps: isDev })
    .pipe(logger.handleError('JS'))
    .pipe(webpack({ config: webpackConfig(isDev) }))
    .pipe(gulp.dest(filePaths.build.js))
    .pipe(plugins.browserSync.stream());
};

export { javaScript };
