'use strict'

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpIf = require('gulp-if');
const del = require('del');
const runSequence = require('run-sequence');
const debug = require('gulp-debug');
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer');

// Plugins for styles
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const cssnext = require('postcss-cssnext');
const smartImport = require("postcss-smart-import");
const assets = require("postcss-assets");
const sprites = require('postcss-sprites');
const clearfix = require('postcss-clearfix');

// Plugins for scripts
const uglify = require('gulp-uglify');

// Plugins for markup
const pug = require('gulp-pug');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// BrowserSync
gulp.task('server', function() {
  browserSync.init({
    server: 'dist',
    notify: false,
    open: false
  });
});

const processors = [
  smartImport(),
  cssnext({
    browsers: ['last 4 versions']
  }),
  clearfix(),
  assets()
];
if (!isDevelopment) { processors.push(csso); }

gulp.task('styles', function() {
  return gulp.src('src/styles/*.css')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(postcss(processors))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('markup', function() {
  return gulp.src('src/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
});

gulp.task('assets', function() {
  return gulp.src('src/assets/**/*.*')
    .pipe(newer('dist/assets'))
    .pipe(gulp.dest('dist/assets'))
});

gulp.task('clear', function() {
  return del('dist');
});

gulp.task('watch', function() {
  gulp.watch(['src/styles/**/*.css', 'src/blocks/**/*.css'], () => 
    runSequence('styles', browserSync.reload));
  gulp.watch('src/scripts/**/*.js', () => 
    runSequence('scripts', browserSync.reload));
  gulp.watch(['src/pages/**/*.pug', 'src/blocks/**/*.pug'], () => 
    runSequence('markup', browserSync.reload));
  gulp.watch('src/assets/**/*.*', () => 
    runSequence('assets', browserSync.reload));
});

// Use 'npm run build' for production build
gulp.task('build', function(callback) {
  runSequence('clear', ['styles', 'scripts', 'markup', 'assets'], callback);
});

// Use 'gulp' for develop
gulp.task('default', function(callback) {
  runSequence(['styles', 'scripts', 'markup', 'assets'], ['watch', 'server'], callback);
});