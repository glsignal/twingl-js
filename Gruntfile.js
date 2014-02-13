module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/**/*spec.js'
      }
    },

    watch: {
      files: [ './**/*.js' ],
      tasks: 'jasmine'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Run our specs by default
  grunt.registerTask('default', ['jasmine']);
};
