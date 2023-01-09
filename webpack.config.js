const path = require('path');
const webpack  = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

module.exports = {
    mode: process.env.NODE_ENV,// development production
    entry: {
        main: './src/sass/style.scss',
        img: './src/js/img.js',
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'pro'),
        filename: 'assets/js/[name].js',
        assetModuleFilename: 'assets/img/[name][ext][query]',
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [MiniCssExtractPlugin.loader,"css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')
                            ],
                        },
                    },
                },"sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                dependency: { not: ['url'] },
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                  },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']// 如使用babelconfig 此option可刪
                    }
                },
                include: path.resolve(__dirname, 'src'),
            }, 
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css"
        }),
        new CleanWebpackPlugin(),        
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            minify: false,
            filename: 'index.html',
            chunks: ['main','index'],
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/layout/header.html'),
            location: 'header',
            template_filename: ['index.html']
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/layout/banner.html'),
            location: 'template-banner',
            template_filename: ['index.html']
        }),
        new HtmlWebpackPartialsPlugin({
            path: path.join(__dirname, './src/layout/footer.html'),
            location: 'footer',
            template_filename: ['index.html']
        }),
    ],
    devtool: 'source-map',
    devServer:{
        host: 'localhost',
        port: 1001,
        open: true
    },
};