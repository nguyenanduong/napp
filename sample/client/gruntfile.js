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
    },
    nappSetup: {
      all: {
        options: {
          installIndirectNPMDeps:false
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-napp-setup");
  grunt.loadNpmTasks("intern");

  grunt.registerTask("setup", ["nappSetup"]);
  grunt.registerTask("test", ["intern"]);
  grunt.registerTask("default", ["setup", "jshint", "test"]);
};
