// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var notifyStats = require("./utils/notify-stats");

var assetsPath = path.resolve(__dirname, "../dist");
var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
    debug: true,
    devtool: 'eval-source-map',
    entry: {
        "app": [
        "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
        "webpack/hot/only-dev-server",
        "./src/app/app.js"
    ]
    },
    output: {
        path: assetsPath,
        filename: "[name]-[hash].js",
        chunkFilename: "[name]-[chunkhash].js",
        publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/assets/"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
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

    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),

                // Mainly used to require CSS files with webpack, which can happen only on browser
                // Used as `if (process.env.BROWSER)...`
                BROWSER: JSON.stringify(true)
            }
        }),

    // stats
    function () {
            this.plugin("done", notifyStats);
    },
    function () {
            this.plugin("done", writeStats);
    },

    // print a webpack progress
    new webpack.ProgressPlugin(function (percentage, message) {
            var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
            var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();
            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + "% :" + message + MOVE_LEFT);
        })

  ]
};