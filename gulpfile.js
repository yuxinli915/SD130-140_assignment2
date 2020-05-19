const gulp = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const cleanCSS = require(`gulp-clean-css`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const reload = browserSync.reload;

function compressCSS() {
  return gulp.src(`src/css/*.css`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`dist/css`));
}

function babelJS() {
  return gulp.src(`src/js/*.js`)
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest(`dist/js`));
}

function compressJS() {
  return gulp.src(`dist/js/*.js`)
    .pipe(uglify())
    .pipe(gulp.dest(`dist/js`));
}

function sync() {
  browserSync.init({ server: { baseDir: `./src` } });
  gulp.watch(`src/js/*.js`).on(`change`, reload);
  gulp.watch(`src/*.html`).on(`change`, reload);
  gulp.watch(`src/css/*.css`).on(`change`, reload);
}

exports.default = gulp.parallel(compressCSS, gulp.series(babelJS, compressJS), sync);