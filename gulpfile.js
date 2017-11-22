/// <binding BeforeBuild='copy-files' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('copy-files', function () {
  //ng build
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    //copy over the generated scripts
    gulp.src(['./dist/inline.bundle.js', './dist/polyfills.bundle.js',
      './dist/styles.bundle.js', './dist/vendor.bundle.js', './dist//main.bundle.js'])
      .pipe(gulp.dest('./Scripts/'));
  });
});
