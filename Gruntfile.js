module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-ts")
    grunt.loadNpmTasks("grunt-contrib-clean")

    // 配置任务
    grunt.initConfig({
        // Empties folders to start fresh
        clean: {
            default: ['dist']
        },
        // typescripts 编译任务
        ts: {
            default: {
                tsconfig: "./tsconfig.json"
            }
        }
    })
    // 将 ts 编译任务注册到默认执行命令
    grunt.registerTask('default', ['clean', 'ts'])
}