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
          'spec/helpers/spec_helper.js',
          'spec/shared_examples/**/*.js'
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
      tasks: 'jasmine:src:build',
      options: {
        livereload: true,
        keepRunner: true
      }
    },

    copy: {
      build: {
        cwd: './',
        src: [
          'vendor/superagent.js',
          'src/**/*.js'
        ],
        dest: 'build',
        expand: true
      },
    },

    clean: {
      build: {
        src: ['build']
      }
    },

    concat: {
      dist: {
        src: ['build/**/*.js'],
        dest: 'dist/twingl.js'
      }
    },

    uglify: {
      build: {
        options: {
          mangle: true
        },
        files: {
          'dist/twingl.min.js': 'dist/twingl.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Run our specs by default
  grunt.registerTask('default', ['jasmine']);

  grunt.registerTask(
    'build',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'clean', 'copy', 'concat', 'uglify' ]
  );
};
