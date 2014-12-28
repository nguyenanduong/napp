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
          suites: grunt.file.expand(["test/**/*.js", "!test/intern.js"])
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-napp-setup");
  grunt.loadNpmTasks("intern");

  grunt.registerTask("setup", ["napp_setup"]);
  grunt.registerTask("test", ["intern"]);
  grunt.registerTask("default", ["napp_setup", "jshint", "intern"]);
};
