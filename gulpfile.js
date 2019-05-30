// eslint-disable-next-line
const gulp = require('gulp');
const rename = require('gulp-rename');
const cssWrap = require('./src/index');

gulp.task('default', async () => {
  await gulp.src('demo/test.css')
    .pipe(cssWrap({
      selector: '.my-app',
      skip: null,
      log: true,
    }))
    .pipe(rename({ suffix: '.scope' }))
    .pipe(gulp.dest('demo/'));
});
