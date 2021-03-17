const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        hack: './src/hack',
        main: './src/main',
        worker: './src/worker',
    },
    devtool: 'inline-source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'min'),
    },
    target: 'node',
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader', options: { transpileOnly: true } },
            { test: /\.(js\.map|d\.ts)$/i, loader: 'ignore-loader' },
        ],
    },
    externals: [
        ({ request }, callback) => {
            if (/^[@a-zA-Z0-9/_-]+/.test(request)) {
                // 使用 request 路径，将一个 commonjs 模块外部化
                return callback(null, `commonjs ${request}`);
            }
            if (/\.json$/.test(request)) {
                // 使用 request 路径，将一个 commonjs 模块外部化
                return callback(null, `commonjs ${request}`);
            }
            callback();
        },
    ],
};
