/* eslint consistent-return:0 */
let server;

const express = require('express');
const logger = require('./logger');
const fs = require('fs');
const path = require('path');

const http = require('http');
const https = require('https');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;

const app = express();


// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const httpsEnabled = argv.httpsEnabled || false;
const port = argv.port || process.env.PORT || 3000;

// const server = httpsEnabled ? https.createServer(credentials, app) : http.createServer(app);
// SSL key and certificates not needed if  we are using regular http
if (httpsEnabled === true) {
  const privateKey = fs.readFileSync(path.join(__dirname, 'certificates/server.key'), 'utf-8');
  const certificate = fs.readFileSync(path.join(__dirname, 'certificates/server.crt'), 'utf-8');
  const credentials = {
    key: privateKey,
    cert: certificate,
  };
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

// Start your app.
server.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, httpsEnabled, url);
    });
  } else {
    logger.appStarted(port, prettyHost, httpsEnabled);
  }
});
