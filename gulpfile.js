var babel = require('gulp-babel');
var concat = require('gulp-concat');
var css = require('gulp-css');
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');

gulp.task('build', ['dev', 'sass','css']);

gulp.task('dev', function(){
	return gulp.src(['src/**/*.js','!./bower_components/**'])
	.pipe(concat('index.js'))
	.pipe(babel())
	.pipe(uglify())
	.pipe(gulp.dest('public'));
});

gulp.task('prod', function(){
	gulp.src(['public/components/**/*.*']);
});

gulp.task('sass', function () {
	gulp.src('src/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
	 gulp.src('src/assets/*.{jpg,png}')
	 .pipe(gulp.dest('public/assets'));
});

gulp.task('server', function(){
	browserSync.init({
		files: [
			"src/**/*.scss",
			"public/assets",
			"public/*.css",
			"public/*.js",
			"public/index.html",
			"public/components/**/*.*"
		],
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		logFileChanges: true,
		logLevel: "debug",
		logPrefix: "Emus Project",
		notify: true,
		port: 1982,
		reloadOnRestart: true,
		server: {
			baseDir: 'public',
			routes: {
        "/node_modules": "node_modules"
    }
		},
		tunnel: true,
		ui: {
			port: 8080
		}
	});
});

gulp.task('watch', function(){
	gulp.watch('src/**/*.js', ['dev']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/assets/*.{jpg,png}', ['assets']);
	gulp.watch('public/components/**/*.*', ['prod']);
});


gulp.task('default',['server','watch'])
/*
gulp.task('scripts:watch', function(){
	gulp.watch('src/*.js', ['scripts']);
});

gulp.task('sass:watch', function(){
	gulp.watch('src/*.scss', ['sass']);
});

gulp.task('watch', ['sass:watch', 'scripts:watch'])
*/