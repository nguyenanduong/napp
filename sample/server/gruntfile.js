module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      all: ["**/*.js", "!node_modules/**/*.js", "!amd_modules/**/*.js", "!build/**/*.js"],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    intern: {
      all: {
        options: {
          config: "test/intern",
          //TODO: Create grunt plugin
          suites: grunt.file.expand(["test/**/*.js", "!test/intern.js"])
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("intern");

  // Default task(s).
  grunt.registerTask("test", ["intern"]);
  grunt.registerTask("default", ["jshint", "intern"]);
};