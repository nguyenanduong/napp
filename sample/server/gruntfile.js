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

  // Task(s).
  grunt.registerTask("install_npm_modules", "Setup npm package dependencies", function () {
    // loop through amd modules to find node dependencies
    var done = this.async();
    deps = [];
    grunt.file.expand(["amd_modules/*/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
      for (dep in packageJson.dependencies || {}) {
        deps.push(dep + "@" + packageJson.dependencies[dep]);
      }
    })
    var npm = require("npm");
    npm.load(function (err, npm) {
      if (err) {
        grunt.log.error(err);
        return;
      }

      npm.commands.install(deps, function (err) {
        if (!err) {
          console.log("Node dependencies from AMD packages installed");
        } else {
          console.log("Error: " + err);
        }
        done();
      });
    });
  });

  grunt.registerTask("generate_require_config", "", function () {
    var done = this.async();
    var path = require("path");
    var packages = [];
    var mainPackage = {
      name: grunt.config("pkg").name,
      location: "."
    };
    grunt.file.expand(["amd_modules/*/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
      packages.push({
        name: packageJson.name,
        location: path.dirname(packageJsonPath),
        main: packageJson.main
      })
    });

    var content = grunt.template.process(
      "(function (define) {\n" +
      "    define({\n" +
      "        packages: [\n" +
      "<% _.forEach(deps, function(dep) { %>" +
      "            {\n" +
      "                \"name\": \"<%- dep.name %>\",\n" +
      "                \"location\": \"<%- dep.location %>\"" +
      "<%     if (dep.main) { %>" +
      ",\n                \"main\": \"<%- dep.main %>\"\n" +
      "            },\n" +
      "<%     } else {%>" +
      "\n" +
      "            },\n" +
      "<%     }%>" +
      "<% }); %>" +
      "            {\n" +
      "                \"name\": \"<%- main.name %>\",\n" +
      "                \"location\": \".\"\n" +
      "            }\n" +
      "        ]\n" +
      "    });\n" +
      "})((typeof define === \"function\" && define.amd) ? define : function (exp) {\n" +
      "    module.exports = exp;\n" +
      "});\n",
      {
        data: { main: mainPackage, deps: packages }
      }
    );

    grunt.file.write("require.config.js", content);

    console.log("require.config.js generated.");
  });

  grunt.registerTask("setup", ["install_npm_modules", "generate_require_config"]);
  grunt.registerTask("test", ["intern"]);
  grunt.registerTask("default", ["setup", "jshint", "intern"]);
};
