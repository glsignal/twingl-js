module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      src: ['src/**/*.js'],
      options: {
        vendor: [
          'vendor/jquery.js',
          'vendor/jasmine-jquery.js',
          'vendor/superagent.js',
          'vendor/sinon.js'
        ],
        helpers: [
          'spec/helpers/spec_helper.js'
        ],
        specs: 'spec/**/*spec.js'
      }
    },

    watch: {
      files: [
        'Gruntfile.js',
        './spec/**/*.js',
        './src/**/*.js'
      ],
      tasks: 'jasmine',
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Run our specs by default
  grunt.registerTask('default', ['jasmine']);
};
