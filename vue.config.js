// 该文件相当于webpack.config.js，所有有关wbp的配置都在这里配置
// 模块导出
module.exports = {
    devServer: {
        // 自动打开网页
        open: true,
        port: 6710
    },
    // 配置px自动转rem的
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        // rem的单位， 因为使用了lib-flexible, lib-flexible会把所有的屏幕分成10份
                        // 1rem 就应该配置为 设计图的  1/10   640
                        remUnit: 36
                    })
                ]
            }
        }
    }

}