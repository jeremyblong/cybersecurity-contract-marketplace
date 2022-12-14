const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'base-uri': "'self'",
    'object-src': "'none'",
    'worker-src': ["'unsafe-eval'", "'unsafe-inline'", "blob:"],
    'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
    'style-src': ["https://fonts.googleapis.com https://use.fontawesome.com http://cdnjs.cloudflare.com 'unsafe-inline'", "'self'", "'unsafe-eval'"],
    'font-src': "https://kit.fontawesome.com 'self' data:",
};

function addCspHtmlWebpackPlugin(config) {
    if(process.env.NODE_ENV === 'production') {
        config.plugins.push(new cspHtmlWebpackPlugin(cspConfigPolicy));
    }

    return config;
}

module.exports = {
    webpack: override(addCspHtmlWebpackPlugin),
};