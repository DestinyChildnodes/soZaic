module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        seperator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/built.js',
      },
    },//end of concat

    uglify: {
      dist: {
        files: {
          'public/dist/built.min.js': ['public/dist/built.js']
        }
      }
    },//end of uglify

    jshint:{
      files: [
        'public/client/**/*.js',
      ],
      option: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores:[
          'public/dist/**/*.js'
        ]
      }
    },//end of jshint

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/',
          src: ['*.css', '!*.min.css'],
          dest: 'public/dist',
          ext: '.min.css'
        }]
      }
    },//end of cssmin


    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },//end of nodemon

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },//end of watch

    shell: {
      heroku: {
        command: 'git push heroku master'
      }
    },//end of shell


  });//end of initConfig

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

//==========================================
//Grunt tasks
//==========================================

grunt.registerTask('server', function (target) {
  var nodemon = grunt.util.spawn({
       cmd: 'grunt',
       grunt: true,
       args: 'nodemon'
  });
  nodemon.stdout.pipe(process.stdout);
  nodemon.stderr.pipe(process.stderr);
  grunt.task.run([ 'watch' ]);
});

grunt.registerTask('jshints',[
  'jshint'
]);

grunt.registerTask('cssmins',[
  'cssmin'
]);

grunt.registerTask('concats',[
  'concat'
]);

grunt.registerTask('uglifys',[
  'uglify'
]);


grunt.registerTask('build',[
  'jshints',
  'cssmins',
  'concats',
  'uglifys'
]);

grunt.registerTask('upload', function() {
  if(grunt.option('prod')) {
    // add your production server task here
    grunt.task.run(['shell:heroku']);
  } else {
    grunt.task.run([ 'server' ]);
  }
});


grunt.registerTask('deploy', [
  'build',
  'upload'
]);
}
