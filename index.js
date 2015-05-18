'use strict';

var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

/**
 * Minify assets. As for now, only optimize images.
 *
 * @param  {String} folderPath - Extracted pub folder containing files to optimize
 * @return {void} Optimize and override files
 */
exports.minify = function (folderPath) {

  // Remove trailing slash
  folderPath = folderPath.replace(/\/+$/, "");

  // Optimize images
  gulp.task('default', function () {
    return gulp
      .src(folderPath + '/**/*.{png,jpg,jpeg,gif,webp,svg}')
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest(folderPath));
  });

  gulp.start();
};
