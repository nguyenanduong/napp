/*
 * grunt-napp-setup
 * https://github.com/nguyenanduong/napp
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('napp_setup', 'The best Grunt plugin ever.', function() {
    var path = require("path");
    var npm = require("npm");

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var done = this.async();

    var deps = [];
    var packages = [];

    grunt.file.expand(["amd_modules/*/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
      for (var dep in packageJson.dependencies || {}) {
        deps.push(dep + "@" + packageJson.dependencies[dep]);
      }

      packages.push({
        name: packageJson.name,
        location: path.dirname(packageJsonPath),
        main: packageJson.main
      });
    });

    var mainPackage = {
      name: grunt.config("pkg").name,
      location: "."
    };
    grunt.file.expand(["amd_modules/*/package.json"]).forEach(function (packageJsonPath) {
      var packageJson = grunt.file.readJSON(packageJsonPath);
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
          grunt.error();
        }
        done();
      });
    });
  });

};
