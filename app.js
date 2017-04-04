var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var https = require('https');
var http = require('http');

var app = express();


var HTTP_PORT = 3102;
var HTTPS_PORT = 3101;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

// HTTPS
var secureServer = https.createServer({
    key: fs.readFileSync('keys/41254616-sbbraspian.ddns.net.key'),
    cert: fs.readFileSync('keys/41254616-sbbraspian.ddns.net.cert')
}, app)
    .listen(HTTPS_PORT, function () {
        console.log('Secure Server listening on port ' + HTTPS_PORT);
    });

var insecureServer = http.createServer(app).listen(HTTP_PORT, function () {
    console.log('Insecure Server listening on port ' + HTTP_PORT);
})




// // Route all Traffic to Secure Server
// // Order is important (this should be the first route)
// app.all('*', function(req, res, next){
//   if (req.secure) {
//     return next();
//   };
//   res.redirect('https://localhost:'+HTTPS_PORT+req.url);
//   // res.redirect('https://'+req.hostname+':'+HTTPS_PORT+req.url);
// });
