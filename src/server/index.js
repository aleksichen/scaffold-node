const Koa = require('koa');
const logger = require('koa-logger');
const convert = require('koa-convert');
const staticCache = require('koa-static-cache')
const path = require('path');
const render = require('koa-ejs');
const app = new Koa();

app.use(convert(logger()));

if (app.env === "development") {
    require("../../webpack/server");
}

// On production, use the assets directory for static files
// This directory is created by webpack on build time.
if (app.env === "production") {
    app.use(convert(staticCache(path.join(__dirname, 'public/'), {
        maxAge: 365 * 24 * 60 * 60
    })));
}

render(app, {
    root: path.join(__dirname, 'view'),
    layout: false,
    viewExt: 'html',
    cache: true,
    debug: true
});

app.use(convert(function* () {
    var webpackStats;
    if (this.app.env === "production") {
        webpackStats = require("../../webpack-stats.json");
    }
    // On development, serve the static files from the webpack dev server.
    if (this.app.env === "development") {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackStats = require("../../webpack-stats.json");
        delete require.cache[require.resolve("../../webpack-stats.json")];
    }
    yield this.render('app', webpackStats);
}));

const port = process.env.PORT || 3000;

// Start the koa server
app.listen(port, () => {
    console.log(`Koa ${app.env} server listening on http://localhost:${port}/`);
});