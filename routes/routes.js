var appRouter = function (app) {
    // We need this to build our post string
    var querystring = require('querystring');
    var http = require('http');
    var fs = require('fs');
    const sonyPreSharedKey = '9498'


    app.get("/", function (req, res) {
        res.send("Sony TV API");
    });


    app.post("/off", function (req, res) {
        PostCode("AAAAAQAAAAEAAAAvAw==")
        return res.send(req.body);
    });
    // app.post("/on", function (req, res) {
    //     PostCode("AAAAAQAAAAEAAAAvAw==")
    //     return res.send(req.body);
    // });
    app.post("/channelUp", function (req, res) {
        PostCode("AAAAAQAAAAEAAAAQAw==")
        return res.send(req.body);
    });
    app.post("/channelDown", function (req, res) {
        PostCode("AAAAAQAAAAEAAAARAw==")
        return res.send(req.body);
    });
    app.post("/volUp", function (req, res) {
        PostCode("AAAAAQAAAAEAAAASAw==")
        return res.send(req.body);
    });
    app.post("/volDown", function (req, res) {
        PostCode("AAAAAQAAAAEAAAATAw==")
        return res.send(req.body);
    });
    app.post("/mute", function (req, res) {
        PostCode("AAAAAQAAAAEAAAAUAw==")
        return res.send(req.body);
    });



    app.post("/epg", function (req, res) {
        // if(!req.body.username || !req.body.password || !req.body.twitter) {
        //     return res.send({"status": "error", "message": "missing a parameter"});
        // } else {
        //     return res.send(req.body);
        // }

        PostCode("AAAAAgAAAKQAAABbAw==")
        return res.send(req.body);
    });


    function PostCode(codestring) {
        // Build the post string from an object
        //   var post_data = querystring.stringify({
        //       'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
        //       'output_format': 'json',
        //       'output_info': 'compiled_code',
        //         'warning_level' : 'QUIET',
        //         'js_code' : codestring
        //   });

        var post_data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
            "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\" s:encodingStyle=\"http://schemas.xmlsoap.org/soap/encoding/\"> " +
            "<s:Body><u:X_SendIRCC xmlns:u=\"urn:schemas-sony-com:service:IRCC:1\">" +
            "<IRCCCode>" + codestring + "</IRCCCode>" +
            "</u:X_SendIRCC></s:Body></s:Envelope>"

        // An object of options to indicate where to post to
        var post_options = {
            host: '192.168.178.21',
            port: '80',
            path: '/sony/IRCC',
            method: 'POST',
            headers: {
                'X-Auth-PSK': sonyPreSharedKey
            }
        };

        // Set up the request
        var post_req = http.request(post_options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();

    }

    // // This is an async file read
    // fs.readFile('LinkedList.js', 'utf-8', function (err, data) {
    //   if (err) {
    //     // If this were just a small part of the application, you would
    //     // want to handle this differently, maybe throwing an exception
    //     // for the caller to handle. Since the file is absolutely essential
    //     // to the program's functionality, we're going to exit with a fatal
    //     // error instead.
    //     console.log("FATAL An error occurred trying to read in the file: " + err);
    //     process.exit(-2);
    //   }
    //   // Make sure there's data before we post it
    //   if(data) {
    //     PostCode(data);
    //   }
    //   else {
    //     console.log("No data to post");
    //     process.exit(-1);
    //   }
    // });

}

module.exports = appRouter;