//grunt-contrib-concat
//grunt-contrib-sass
//grunt-contrib-uglify
//grunt-contrib-cssmin
//grunt-contrib-watch
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'dist/css/main.css': 'src/css/main.sass'
        }
      },
      options: {
        loadPath: [
          'bower_components/bourbon/app/assets/stylesheets',
          'bower_components/neat/app/assets/stylesheets'
        ]
      }
    },
    autoprefixer: {
      dist:{
        options: {
          map: true
        },
        your_target: {
          'dis/css/main.css': 'dis/css/main.css'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    concat: {
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/js/script.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/script.min.js': ['dist/js/script.js']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    connect: {
      server: {
       options: {
         port: 3000,
         debug: true,
         livereload: true,
         base: '.'
        }
      }
    },
    watch: {
      options: {
      livereload: true,
      },
      files: ['**/*.js', '**/*.sass', 'index.html'],
      tasks: ['jshint', 'concat', 'sass', 'autoprefixer']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('test', ['jshint', 'qunit', 'connect', 'watch', 'sass']);

  grunt.registerTask('default', ['jshint', 'sass', 'concat', 'autoprefixer', 'connect:server', 'watch']);

  grunt.registerTask('prod', [ 'concat', 'cssmin', 'autoprefixer', 'sass', 'uglify']);
};
