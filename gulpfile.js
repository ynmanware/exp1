var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('default', function(){
	var options = {
		script: 'server.js',
		delayTile: 1,
		env: {
			'PORT': 5000
		},
		watch: jsFiles
	}
	
	return nodemon(options).on('restart', function(ev){
		console.log('Restarting....');
	})
})