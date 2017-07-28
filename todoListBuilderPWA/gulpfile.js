// http://ryanchristiani.com/getting-started-with-gulp-and-sass/
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
// https://gist.github.com/frankdejonge/a8e999f30f5c95049a43
//https://css-tricks.com/gulp-for-beginners/

var browserify = require( "browserify" );
var gulp = require( "gulp" );
var sass = require( "gulp-sass" );
var babelify = require('babelify');
var fs = require("fs");

gulp.task( "styles", () => {
  return gulp.src( "./style/*.sass" )
    .pipe( sass().on( "error", sass.logError ) ) // Using gulp-sass
    .pipe( gulp.dest( "./dist" ) );
});

gulp.task( "javascript", () => {
  return browserify( "./src/main.js" ,{ debug: true } ).transform( babelify,{ presets: ["es2015"] } )
  .bundle()
  .pipe(fs.createWriteStream("./dist/bundle.js"));
});

gulp.task( "task-start", () => {
  gulp.watch( "./src/*.*", [ "styles" , "javascript"] );
});

