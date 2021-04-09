const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'server.js'
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'ts-loader' }
                ],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
    ],
    resolve: {
        alias: {
            "@v1/controllers": resolve(__dirname, "./src/v1/controllers/"),
            "@v1/services": resolve(__dirname, "./src/v1/services/"),
            "@v1/middleware": resolve(__dirname, "./src/v1/middleware/"),
            "@utils": resolve(__dirname, "./src/utils/"),
            "@http-errors": resolve(__dirname, "./src/errors"),
            "@types": resolve(__dirname, "./src/types"),
            "@constants": resolve(__dirname, "./src/constants")
          },
        extensions: ['.tsx', '.ts', '.js'],
    },
};
