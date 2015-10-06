module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            buildProducts: "build/"
        },
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3000,
                    base: '.',
                    keepalive: true
                }
            }
        }
    });

    // Load the task plugins
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('serve', ['connect']);
};