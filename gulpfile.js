import gulp from 'gulp'
import { path } from './gulp/config/path.js'

global.app = {
  path: path,
  gulp: gulp,
}

import { copy } from './gulp/tasks/copy.js'

gulp.task('default', copy)