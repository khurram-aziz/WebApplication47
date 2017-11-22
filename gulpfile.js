/// <binding BeforeBuild='copy-files' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('copy-files', function () {
    //vue
    gulp.src(['./bower_components/vue/dist/vue.js'])
        .pipe(gulp.dest('./Scripts/'));
});