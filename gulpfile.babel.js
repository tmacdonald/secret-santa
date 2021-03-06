var gulp = require('gulp');
var browserSync = require('browser-sync');

var reload = browserSync.reload;

// Watch files for changes & reload
gulp.task('serve', [], () => {
  browserSync({
    notify: false,
    // Customize the Browsersync console logging prefix
    logPrefix: 'santa',
    // Allow scroll syncing across breakpoints
    scrollElementMapping: ['main', '.mdl-layout'],
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/**/*.css'], reload);
  gulp.watch(['app/**/*.js'], reload);
});
