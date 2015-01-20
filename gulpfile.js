var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var htmlreplace = require('gulp-html-replace');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var fs = require('fs')
var cloudfiles = require("gulp-cloudfiles");

var paths = {
  dist: {
    path: './dist',
    scripts: './dist/js',
    script_bundle: 'js/app.js',
    vendor_bundle: 'js/vendor.bundle.js',
    styles: './dist/css',
    styles_bundle: 'css/app.css',
    views: './dist',
    images: './dist/img'
  },
  src: {
    path: './src',
    main_scripts: './src/scripts/app.js',
    scripts: './src/scripts/*.js',
    styles: './src/styles/*.scss',
    images: './src/images/**',
    views: ['./src/index.html', './src/views/*.html'],
    main_views: './src/index.html'
  }
}

gulp.task('fonts', function () {
  return gulp.src([
    './vendor/font-awsome/fonts/*'
  ])
    .pipe(gulp.dest(paths.dist.path + '/fonts'))
});

gulp.task('styles', ['fonts'], function () {
  return gulp.src(paths.src.styles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    //.pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest(paths.dist.styles));
});

gulp.task('lint', function () {
  return gulp.src(paths.src.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('scripts', ['lint'], function () {
  return browserify(paths.src.main_scripts)
    .bundle()
    .pipe(source('app.js'))
    //.pipe(buffer())
    //.pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('images', function () {
  return gulp.src('./src/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

gulp.task('html', function () {
  return gulp.src(paths.src.main_views)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlreplace({
      'css': paths.dist.styles_bundle,
      'js': [paths.dist.vendor_bundle, paths.dist.script_bundle]
    }))
    .pipe(gulp.dest(paths.dist.views));
});

gulp.task('msg',function(){
  return gulp.src('./src/messages/**')
    .pipe(gulp.dest('./dist/msg/'));
});

gulp.task('modernizr', function () {
  return gulp.src('./vendor/modernizr/modernizr.js')
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.scripts));
});
gulp.task('vendor', ['modernizr'], function () {

  return gulp.src([
    './vendor/jquery/dist/jquery.js'
    //'./vendor/foundation/js/foundation/foundation.js',
    //'./vendor/foundation/js/foundation/foundation.topbar.js',
    //'./vendor/foundation/js/foundation/foundation.orbit.js',

    //'./vendor/i18next/i18next.js'
    //'./vendor/d3/d3.js'
  ])
    .pipe(uglify())
    .pipe(concat('vendor.bundle.js'))
    .pipe(gulp.dest(paths.dist.scripts));
});

gulp.task('webserver', function () {
  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      defaultFile: 'index.html'
    }));
});

gulp.task('dist', ['vendor', 'msg', 'scripts', 'styles', 'images', 'html']);

gulp.task('watch', function () {
  gulp.watch(paths.src.scripts, ['scripts']);
  gulp.watch(paths.src.images, ['images']);
  gulp.watch(paths.src.styles, ['styles']);
  gulp.watch(paths.src.views, ['html']);
  gulp.watch('./src/messages/**', ['msg']);

});

gulp.task('start', ['dist', 'watch', 'webserver']);

gulp.task('deploy', function () {
  var rackspace = JSON.parse(fs.readFileSync('./rackspace.json'));
  var options = {
    delay: 1000, // optional delay each request by x milliseconds, default is 0
    headers: {}, // optional additional headers
    uploadPath: "" //optional upload path (uses the container root by default)
  };

  gulp.src('./dist/**', {read: false})
    .pipe(cloudfiles(rackspace, options));
});
