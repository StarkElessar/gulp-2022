import fileinclude from "gulp-file-include"
import webpHtml from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import htmlMin from 'gulp-htmlmin'

export const html = () => {
  return app.gulp.src(app.path.src.html)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(fileinclude())
    .pipe(app.plugins.replace(/@img\//g, 'images/'))
    .pipe(app.plugins.if(app.isBuild, webpHtml()))
    .pipe(htmlMin({
      useShortDoctype: true,
      sortClassName: true,
      collapseWhitespace: app.isBuild,
      removeComments: app.isBuild
    }))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      'value': '%DT%',
      'append': {
        'key': '_v',
        'cover': 0,
        'to': [
          'css',
          'js',
        ],
      },
      'output': {
        'file': 'gulp/version.json'
      },
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}