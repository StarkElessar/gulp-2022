export const copy = () => {
  return app.gulp
    .src(app.path.src.static)
    .pipe(app.gulp.dest(app.path.build.static))
}
