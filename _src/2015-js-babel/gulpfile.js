// plugin
var gulp = require('gulp'),
	babel = require('gulp-babel');

// directory
var dir = {
	src: '_src',
	dist: '_dist'
};

// babel
gulp.task('babel', function(){
	gulp.src(dir.src + '{,**/}js')
		.pipe(babel({
			souceMap: false,
			modules: 'common'
		}))
		.pipe(gulp.dest('./dist/js'));
});