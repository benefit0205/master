// plugin
var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	using = require('gulp-using'),
	cached = require('gulp-cached'),
	remember = require('gulp-remember'),
	uglify = require('gulp-uglify'),
	pleeease = require('gulp-pleeease'),
	csscomb = require('gulp-csscomb'),
	babel = require('gulp-babel');

// directory
var dir = {
	src: '_src',
	dist: '_dist'
};
// autoprefixer
var BROWSERS = [
	'safari >= 7',
	'last 2 ff versions',
	'last 2 chrome versions',
	'ios >= 7',
	'android >= 2.3',
	'last 2 and_ff versions',
	'last 2 and_chr versions'
];

// stylus
gulp.task('stylus', function () {
	return gulp.src(dir.src + '/**/styl/**/*.styl')
		.pipe(cached())
		.pipe(using())
		.pipe(stylus())
		.pipe(remember())
		.pipe(concat('all.css'))
		.pipe(pleeease({autoprefixer: BROWSERS}))
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest(dir.src + '/**/css/'));
});

// browser-sync
gulp.task('browserSyncTask', function(){
	browserSync.init({
		server : {
			baseDir: dir.src,
			directory: true
		},
		files : [
			dir.src + '/{,**/}*.html',
			dir.src + '/{,**/}*.css'
		]
	});
	gulp.watch([dir.src + '/**/styl/**/*.styl'], ['stylus', browserSync.reload]);
});

// css sort
gulp.task('csscomb', function(){
	return gulp.src(dir.src + '/{,**/}*.css')
		.pipe(csscomb())
		.pipe(gulp.dest(dir.dist));
});

// babel
gulp.task('babel', function(){
	gulp.src(dir.src + '{,**/}js')
		.pipe(babel({
			souceMap: false,
			modules: 'common'
		}))
		.pipe(gulp.dest('./dist/js'));
});