const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.join(__dirname, './auth_config.json'),
                        to: path.join(__dirname, './dist/auth_config.json'),
                        toType: 'file'
                    }
                ] 
            })
        ]
    }
};