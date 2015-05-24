'use strict';

var gulp      = require('gulp');
var imagemin  = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');

var htmlmin   = require('gulp-minify-html');
var inlinemin = require('gulp-minify-inline');

var jsuglify  = require('gulp-uglify');

/**
 * Minify assets.
 *
 * @param  {String} folderPath - Extracted pub folder containing files to optimize
 * @return {void} Optimize and override files
 */
exports.minify = function (folderPath) {

  // Remove trailing slash
  folderPath = folderPath.replace(/\/+$/, "");

  // Optimize images
  gulp.task('images', function () {
    return gulp
      .src(folderPath + '/**/*.{png,jpg,jpeg,gif,webp,svg}')
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest(folderPath));
  });

  // Minify HTML
  gulp.task('html', function () {
    return gulp.src(folderPath + '/**/*.html')
               .pipe(htmlmin())
               .pipe(inlinemin())
               .pipe(gulp.dest(folderPath));
  });

  // Minify Javascript
  gulp.task('js', function () {
    return gulp.src(folderPath + '/**/*.js')
               .pipe(jsuglify())
               .pipe(gulp.dest(folderPath));
  });

  gulp.start('images', 'html', 'js');
};
