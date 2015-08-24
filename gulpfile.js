var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep').stream;
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});

/* Task listing */
gulp.task('tasklisting', function(){
	log('Loading task');
	$.taskListing();
});

/*** To Dev ***/

/* Inject js and css files to index.html */
gulp.task('inject', ['templatecache', 'templates'], function(){
	return gulp.src('./src/client/index.html')
		.pipe(wiredep({
			bowerJson: require('./bower.json'),
			directory: 'bower_components',
			ignorePath: '../../'
		}))
		.pipe($.inject(gulp.src([
			'./src/client/styles/styles.css'
		]), {ignorePath: '../../', relative: true}))
		.pipe($.inject(gulp.src([
			'src/client/components/**/*.module.js',
			'src/client/components/**/*.js'
		]), {ignorePath: '../../', relative: true}))
		.pipe(gulp.dest('./src/client/'));
});
/* Source files */
gulp.task('templatecache', ['clean-templatecache'], function(){
	log('Angularjs template files!');
	var options = {
		module: 'emus',
		root: 'components/'
	}
	return gulp.src('./src/client/components/**/*.html')
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			'templates.js',
			options
		))
		.pipe(gulp.dest('tmp'));
});
gulp.task('clean-templatecache', function(done){
	clean('tmp', done);
});

gulp.task('templates', ['cleaning-components'], function() {
	log('Copying html files');
	return gulp.src('./src/client/components/**/*.html')
		.pipe(gulp.dest('build/components/'));
});
gulp.task('js', function(){
	log('Analizyng components...');

	gulp.src(['./src/client/components/**/*.js'])
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
});
gulp.task('sass', ['clean-styles'], function () {
	log('Compiling sass to css');
	return gulp.src('./src/client/styles/**/*.scss')
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.sass({outputStyle: 'compressed'}))
		.pipe($.concat('styles.css'))
		.pipe(gulp.dest('src/client/styles/'));
});
gulp.task('clean-styles', function(done){
clean('src/client/styles/styles.css', done);
});

/* To Production */
gulp.task('build', ['cleaning-styles','cleaning-images','cleaning-iconfonts','cleaning-js', 'inject', 'build-images', 'build-iconfont'], function(){
	log('Build to Production');
	var assets = $.useref.assets({searchPath: ['./', './src/client/']});
	var cssFilter = $.filter('**/*.css', {restore: true});
	var jsLibFilter = $.filter('**/lib.js', {restore: true});
	var jsAppFilter = $.filter('**/app.js', {restore: true});

	return gulp.src('./src/client/index.html')
		.pipe($.inject(gulp.src(
			'tmp/templates.js',{read: false}
		),{starttag: '<!-- inject:template:js -->'}))
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore)
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(gulp.dest('build'));
});

gulp.task('build-images', ['cleaning-images'], function() {
	log('Copying images');
	return gulp.src('./src/client/images/*.{jpg,png}')
		.pipe(gulp.dest('build/images/'));
});
gulp.task('build-iconfont', function() {
	log('Copying iconfonts');
	return gulp.src('./src/client/iconfonts/*.*')
		.pipe(gulp.dest('build/iconfonts/'));
});
gulp.task('cleaning-styles', function(done){
	clean('build/styles/styles.css', done);
});
gulp.task('cleaning-components', function(done){
	clean('build/components/*.*', done);
});
gulp.task('cleaning-images', function(done){
	clean('build/images/**/*.*', done);
});
gulp.task('cleaning-iconfonts', function(done){
	clean('build/iconfonts/emus.*', done);
});
gulp.task('cleaning-js', function(done){
	clean('build/js/**/*.js', done);
});
/* Server */
gulp.task('server', function(){
	log('Server running...');

	browserSync.init({
		files: [
			"src/client/index.html",
			"src/client/images",
			"src/client/iconfont/*.*",
			"src/client/components/**/*.*",
			"src/client/styles/**/*.scss"
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
		reloadDelay: 1500,
		reloadOnRestart: true,
		server: {
			baseDir: 'src/client',
			routes: {
				"/bower_components": "bower_components",
				"/src/client": "client"
			}
		},
		tunnel: false,
		ui: {
			port: 8080
		}
	});
});

/* Watch files */
gulp.task('watch', function(){
	log('Watching files!');

	gulp.watch('src/client/components/**/*.js', ['js']);
	gulp.watch('src/client/styles/**/*.scss', ['sass']);
	gulp.watch('src/client/images/*.*', ['images']);
	gulp.watch('src/client/iconfont/*.*', ['iconfont']);
});

// Default task
gulp.task('default',['server','watch']);

// Clean and log
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
