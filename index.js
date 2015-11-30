delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel-core/register");

// Start the server app
require("./src/server/index");