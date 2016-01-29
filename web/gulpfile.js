var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('clean', function () {
    return gulp.src(['./public/*', '!./public/.gitignore'], {read: false})
        .pipe(clean());
});


gulp.task('css', function () {
    gulp.src(['./source/css/*.scss'])
        .pipe(sass({ onError: function (e) { console.log(e); } }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({ stream: true }));

    gulp.src(['./source/css/*.ttf'])
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('js', function () {
    gulp.src(['./source/js/**/*.js'])
        //.pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('img', function () {
    gulp.src(['./source/img/*.*'])
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('data', function () {
    gulp.src(['./source/js/*.json'])
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('html', function () {
    //var sources = gulp.src(['css/*.css', 'js/*.js'], { read: false, cwd: './public' });

    return gulp.src('./source/index.html')
        //.pipe(inject(sources, { addRootSlash: false }))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ stream: true }));
});


gulp.task('public', function(callback) {
    runSequence('clean',
        [
            'css',
            'js',
            'data',
            'img',
        ],
        'html',
        callback);
});


gulp.task('serve', ['html', 'js', 'css', 'data', 'img'], function () {
    browserSync({
        server: {
            baseDir: './public'
        }
    });

    gulp.watch('./source/js/**/*.js', ['js'])
    gulp.watch('./source/js/*.json', ['data'])
    gulp.watch('./source/css/*.scss', ['css'])
    gulp.watch('./source/img/*.*', ['img'])
    gulp.watch('./source/index.html', ['html'])
});
