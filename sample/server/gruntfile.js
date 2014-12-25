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
    },
    shell: {
      jam: {
        command: "jam install"
      }
    },
    npm_modules: {

    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("intern");
  grunt.loadNpmTasks("grunt-shell");

  // Task(s).
  grunt.registerTask("install_npm_modules", "Setup npm package dependencies", function () {
    // loop through amd modules to find node dependencies
    done = this.async();
    deps = [];
    grunt.file.expand(["amd_modules/**/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
      console.log(packageJsonPath);
      for (dep in packageJson.dependencies || {}) {
        console.log("  " + dep + "@\"" + packageJson.dependencies[dep] + "\"");
        deps.push(dep + "@" + packageJson.dependencies[dep]);
      }
    })
    grunt.util.spawn({
      cmd: "npm",
      args: ["install"].concat(deps),
      opts: {
        stdio: "inherit"
      }
    }, function (err) {
      if (!err) {
        console.log("Node modules installed");
      } else {
        console.log(err);
      }
      done();
    });
  });

  grunt.registerTask("generate_require_config", "", function () {
    grunt.file.expand(["amd_modules/**/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
      console.log(packageJsonPath);
      for (dep in packageJson.dependencies || {}) {
        console.log("  " + dep + "@\"" + packageJson.dependencies[dep] + "\"");
        deps.push(dep + "@" + packageJson.dependencies[dep]);
      }
    })
  });

  grunt.registerTask("setup", ["shell:jam", "install_npm_modules", "generate_require_config"]);
  grunt.registerTask("test", ["intern"]);
  grunt.registerTask("default", ["setup", "jshint", "intern"]);
};