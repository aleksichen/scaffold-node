// Starts a webpack dev server for dev environments

const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("./dev.config");

const debug = require("debug")("dyantou-mobile");

const WEBPACK_HOST = process.env.HOST || "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

const serverOptions = {
    contentBase: `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
    quiet: true,
    noInfo: true,
    hot: true,
    publicPath: config.output.publicPath,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
};

const compiler = webpack(config);
const webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, () => {
    debug("Webpack development server listening on %s:%s", WEBPACK_HOST, WEBPACK_PORT);
});