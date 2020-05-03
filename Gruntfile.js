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
                options: {
                    sourceMap: false,
                    // 编译到的目标版本
                    target: 'es5',
                    rootDir: "src/"
                },
                // 要进行编译的目录及文件
                src: ["src/*.ts"],
                // 编译好的文件的输出目录
                outDir: 'dist/'
            }
        }
    })
    // 将 ts 编译任务注册到默认执行命令
    grunt.registerTask('default', ['clean', 'ts'])
}