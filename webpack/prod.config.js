// Webpack config for creating the production bundle.

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var assetsPath = path.join(__dirname, "../src/server/public/assets/");

module.exports = {
    devtool: "source-map",
    entry: {
        "app": [
        "./src/app/app.js"
    ]
    },
    output: {
        path: assetsPath,
        filename: "[name]-[hash].js",
        chunkFilename: "[name]-[chunkhash].js",
        publicPath: "/assets/" //cdn or public path
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.html$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            }
    ]
    },
    progress: true,
    plugins: [

    // ignore debug statements (uncommented for demo app)
    // new webpack.NormalModuleReplacementPlugin(/debug/, process.cwd() + "/webpack/utils/noop.js"),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css"),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // set global vars
    new webpack.DefinePlugin({
            "process.env": {

                // Mainly used to require CSS files with webpack, which can happen only on browser
                // Used as `if (process.env.BROWSER)...`
                BROWSER: JSON.stringify(true),

                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify("production")

            }
        }),

//     optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
   new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            mangle: false
        }),

    // stats
    function () {
            this.plugin("done", writeStats);
        }

  ]
};