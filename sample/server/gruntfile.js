module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('src/package.json'),
    copy: {
      source: {
        src: "src/",
        dest: "bin/"        
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('build', ['copy:source']);

};