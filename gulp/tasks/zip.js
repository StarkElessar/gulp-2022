import del from 'del';
import zipPlugin from 'gulp-zip';

const zip = () => {
  del(`./${app.path.projectDirName}.zip`);

  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(zipPlugin(`${app.path.projectDirName}.zip`))
    .pipe(app.gulp.dest('./'));
};

export { zip };