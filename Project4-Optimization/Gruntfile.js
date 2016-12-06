module.exports = function(grunt) {
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['css/*.css', 'views/css/*.css'],
          dest: 'dest/',
          ext: '.css'
        }]
      }
    },
    htmlmin: {                                    
      dist: {                                      
        options: {                                 
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'dest/index.html': 'src/index.html',                   
          'dest/project-2048.html': 'src/project-2048.html',                   
          'dest/project-mobile.html': 'src/project-mobile.html',                   
          'dest/project-webperf.html': 'src/project-webperf.html',                   
          'dest/views/pizza.html': 'src/views/pizza.html',                   
        }
      }
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 4
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            cwd: 'src/',
            src: ['**/*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: 'dest/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true,
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'src/',
            src: ['**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'dest/',
            ext: '.jpg'
          }
        ]
      }
    },
    uglify: {
      target: {
        files: {
          'dest/js/perfmatters.js': 'src/js/perfmatters.js',
          'dest/views/js/main.js': 'src/views/js/main.js',
        }
      }
    },
    inline: {
      dist: {
        src: 'dest/index.html',
        dest: 'dest/index.html'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-inline');

  // Default task(s).
  grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin', 'imagemin', 'inline']);

};
