const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        bundle: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        publicPath: "/dist",
        compress: true,
        port: 9000
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            Utils: path.resolve(__dirname, 'src/utils'),
            Components: path.resolve(__dirname, 'src/components'),
            Constants: path.resolve(__dirname, 'src/constants'),
            Stores: path.resolve(__dirname, 'src/stores'),
        }
    },
};