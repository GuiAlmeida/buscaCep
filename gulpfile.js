var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var angularNgAnnotate = require('gulp-ng-annotate');
var gcmq = require('gulp-group-css-media-queries');
var livereload = require('gulp-livereload');
var stripCssComments = require('gulp-strip-css-comments');
var stripJS = require('gulp-strip-comments');
var cssmin = require('gulp-cssmin');

gulp.task('vendors', function () {
    gulp.src([
        'static/vendors/jquery-3.1.1.min.js',
        'static/vendors/bootstrap.min.js',
        'static/vendors/angular.min.js',
        'static/vendors/ng-map.min.js',
        'static/vendors/angular-locale_pt-br.min.js',
        'static/vendors/angular-ui-router.min.js',
        'static/vendors/toaster.min.js',
        'static/vendors/ngmask.min.js',
    ])
        .pipe(concat('vendors.min.js'))
        .pipe(angularNgAnnotate())
        .pipe(uglify())
        .pipe(stripJS())
        .pipe(gulp.dest('static/dist'));
});

gulp.task('app', function () {
    return gulp.src([
        'static/app/app.js',
        'static/app/routes.js',
        'static/app/api.js',
        'static/app/auth.js',
        'static/app/**/**/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(angularNgAnnotate())
        .pipe(uglify())
        .pipe(stripJS())
        .pipe(gulp.dest('static/dist'))
        .pipe(livereload());
});

gulp.task('sass', function () {
    return gulp.src('static/assets/sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: true}))
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(stripCssComments({all: true}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('static/dist'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch(['static/app/**/*.js'], ['app']);
    gulp.watch('static/assets/sass/**/*.scss', ['sass']);
    gulp.watch('static/views/**/*.html');
    livereload.listen();
});

gulp.task('default', ['watch', 'vendors', 'app', 'sass']);