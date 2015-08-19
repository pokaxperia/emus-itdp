var gulp = require('gulp');
var del = require('del');
var browserSync = require('browser-sync');

/*var babel = require('gulp-babel');
var concat = require('gulp-concat');
var css = require('gulp-css');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var util = require('gulp-util');*/
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('build', ['src', 'sass','css']);

gulp.task('src', function(){
	log('Analizyng src...');

	gulp.src(['src/**/*.js', '!./bower_components/**'])
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose:true}))
	.pipe($.concat('index.js'))
	.pipe($.babel())
	.pipe($.uglify())
	.pipe(gulp.dest('public'));
});

gulp.task('dev-components', function(){
	log('Analizyng components...');

	gulp.src(['public/components/**/*.js'])
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose:true}));
});

gulp.task('prod', function(){
	log('Analizyng production...');

	return gulp.src(['public/components/**/*.*']);
});

gulp.task('sass', ['clean-styles'], function () {
	log('Compiling sass ---> css ...');

	gulp.src('src/styles/**/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.sass({outputStyle: 'compressed'}))
		.pipe($.concat('styles.css'))
		.pipe(gulp.dest('public'));
});

gulp.task('clean-styles', function(done){
	log('Cleaning styles...');
	var files = 'public/styles.css';
	clean(files, done);
});

gulp.task('assets', function() {
	log('Copying assets...');

	gulp.src('src/assets/*.{jpg,png}')
	.pipe(gulp.dest('public/assets'));
});

gulp.task('server', function(){
	log('Server running...');

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
		tunnel: false,
		ui: {
			port: 8080
		}
	});
});

gulp.task('watch', function(){
	log('Watching files!');

	gulp.watch('src/**/*.js', ['src']);
	gulp.watch('src/**/*.scss', ['sass']);
	gulp.watch('src/assets/*.{jpg,png}', ['assets']);
	gulp.watch('public/components/**/*.*', ['prod']);
	gulp.watch('public/components/**/*.*', ['dev-components']);
});

gulp.task('default',['server','watch']);

function clean(path, done){
	log('Cleaning: '+ $.util.colors.blue(path));
	del(path, done)
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.green(msg[item]));
			}
		}
	}
	else {
		$.util.log($.util.colors.green(msg));
	}
}
/*
gulp.task('scripts:watch', function(){
	gulp.watch('src/*.js', ['scripts']);
});

gulp.task('sass:watch', function(){
	gulp.watch('src/*.scss', ['sass']);
});

gulp.task('watch', ['sass:watch', 'scripts:watch'])
*/