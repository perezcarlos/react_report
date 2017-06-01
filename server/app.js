const express = require("express");
const morgan = require("morgan");
const path = require("path");
const proxy = require("express-http-proxy");
const bodyParser = require("body-parser");

const app = express();

const jenkinsHost = "https://server2.qa.redbooth.com:8446";

const resolveEnvironmentHost = (req) => {
    console.log(`Called Siringa definition ${req.url}`);
    return `https://${req.header('x-target-environment')}.staging.redbooth.com`;
};

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.use("/siringa", proxy(resolveEnvironmentHost, {
    proxyReqPathResolver: function(req) {
        return `/app/test/load_definition${req.url}`;
    }
}));

app.use("/jenkins", proxy(jenkinsHost));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;