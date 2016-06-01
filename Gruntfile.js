/**
 * Created by gordan on 14.04.16..
 */

module.exports = function(grunt){

    const appSrcFiles = ['app/*.js', 'app/**/*.js', 'bridge/*.js', 'bridge/**/*.js', 'app/*.html', 'app/**/*.html'];
    const serverSrcFiles = ['server/*.js', 'server/**/*.js'];
    const srcFiles = appSrcFiles.concat(serverSrcFiles);

    grunt.initConfig({

        watch:{
            transpile:{
                files: appSrcFiles,
                tasks: ['browserify']
            }
        },

        jshint:{
            all: srcFiles,
            options:{
                esnext: true
            }
        },

        browserify:{
            transpile:{
                files:{
                    'public/bundle.js': appSrcFiles
                },
                options:{
                    browserifyOptions:{ debug: true },
                    transform: [
                        ['babelify', {
                            presets: 'es2015'
                        }],
                        ['stringify', {
                            extensions: ['.html']
                        }]
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['browserify']);

}