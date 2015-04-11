var gulp = require('gulp');
var babel = require('gulp-babel');
var util = require('gulp-util');

gulp.task('default', function() {
  return gulp.src('./src/index.js')
    .pipe(babel())
    .pipe(gulp.dest('./'));
});
