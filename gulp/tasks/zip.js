import del from 'del'
import zipPlugin from 'gulp-zip'

export const zip = () => {
  del(`./${app.path.root}.zip`)

  return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'ZIP',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(zipPlugin(`${app.path.root}.zip`))
    .pipe(app.gulp.dest('./'))
}