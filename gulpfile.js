'use strict';
 
var gulp          = require('gulp'),
	jade          = require('gulp-jade'),	
	sass          = require('gulp-sass'),
	autoprefixer  = require('gulp-autoprefixer'),
	minifyCss     = require('gulp-minify-css'),
	imagemin      = require('gulp-imagemin'),
	uglify        = require('gulp-uglify'),
	uncss         = require('gulp-uncss'),
	useref        = require('gulp-useref'),
	hash          = require('gulp-hash'),
	wiredep       = require('wiredep').stream,
	replaceAssets = require('gulp-replace-assets'),
	watch         = require('gulp-watch'),
	clean         = require('gulp-clean'),
	browserSync   = require('browser-sync'),
	reload        = browserSync.reload;

// Пути
var path = {
	app : {          // Исходники
		html   : 'dist/*.html',
		jade   : 'app/*.jade',
		js     : 'app/js/**/*.js',
		sass   : 'app/scss/style.scss',		
		images : 'app/images/**/*.*',
		fonts  : 'app/fonts/**/*.*',
		},
	dist : {         // Релиз
		html   : 'dist/',		
		js     : 'dist/js/',
		css    : 'dist/css/',
		images : 'dist/images/',
		fonts  : 'dist/fonts/'
	},
	watch : {        // Наблюдение
		jade   : 'app/**/*.jade',
		html   : 'dist/**/*.html',
		js     : 'app/js/**/*.js',
		sass   : 'app/scss/**/*.scss',		
		images : 'app/images/**/*.*',
		fonts  : 'app/fonts/**/*.*'
	},
	clean      : './dist' // Чистка
};

// Настройка сервера
var config = {
	server : {
		'baseDir' : './dist'
	},
	host : 'localhost',
	port : 9000,
	tunel : true
};

// Работа с JADE
gulp.task('jade', function() {	
    gulp.src(path.app.jade)
        .pipe(jade({
        	pretty: '\t',
        }))        
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream : true}));
});

// Работа с HTML
gulp.task('html', ['js'], function(){
	var assets = require('./tmp/assets.json');
	gulp.src(path.app.html)
		.pipe(wiredep())
		.pipe(replaceAssets(assets))
        .pipe(useref())	
		.pipe(gulp.dest(path.dist.html))
		.pipe(reload({stream : true}));
});

// Работа с JS
gulp.task('js', function(){
	return gulp.src(path.app.js)
		.pipe(uglify())
		.pipe(hash())
		.pipe(gulp.dest(path.dist.js))
		.pipe(hash.manifest('assets.json')) 
		.pipe(gulp.dest('tmp'))
		.pipe(reload({stream : true}));
});

//Работа с SASS 
gulp.task('sass', function () {
	gulp.src(path.app.sass)
		.pipe(sass({
			includePaths: [
	        	'node_modules/normalize-scss/sass/',
	        	'app/bower/font-awesome-sass/assets/stylesheets/'
	        ],
		}).on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ["> 0%"] }))	
		.pipe(uncss({
		    html: [ 'dist/*.html' ] // html files to check for styles to keep
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest(path.dist.css))
		.pipe(reload({stream : true}));
});

//Работа с FONTS 
gulp.task('fonts', function(){
	return gulp.src(path.app.fonts)
		.pipe(gulp.dest(path.dist.fonts))
		.pipe(reload({stream : true}));
});

//Работа с IMAGES 
gulp.task('images', function(){
	gulp.src(path.app.images)
		.pipe(imagemin())
		.pipe(gulp.dest(path.dist.images))
		.pipe(reload({stream : true}));
});

// Наблюдение
gulp.task('watch', function () {	
	watch([path.watch.jade], function(event, cb){
		gulp.start('jade');
	});
	watch([path.watch.html], function(event, cb){
		gulp.start('html');
	});
	watch([path.watch.js], function(event, cb){
		gulp.start('js');
	});
	watch([path.watch.sass], function(event, cb){
		gulp.start('sass');
	});
	watch([path.watch.images], function(event, cb){
		gulp.start('images');
	});
	watch([path.watch.fonts], function(event, cb){
		gulp.start('fonts');
	});
});

// Запуск вебсервера
gulp.task('webserver', function(){
	browserSync(config);
});

// Чистка
gulp.task('clean', function(cb){
	clean(path.clean, cb);
});

// Задачи по-умолчанию
gulp.task('default', [	
	'jade',	
	'html',
	'js',
	'sass',
	'images',
	'fonts',
	'webserver',
	'watch'		
]);