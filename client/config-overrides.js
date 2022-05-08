const { override } = require('customize-cra');
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

const cspConfigPolicy = {
    'base-uri': "'self'",
    'object-src': "'none'",
    'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
    'style-src': ["https://fonts.googleapis.com http://cdnjs.cloudflare.com 'unsafe-inline'", "'self'", "'unsafe-eval'"],
    'font-src': "https://kit.fontawesome.com 'self'",
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