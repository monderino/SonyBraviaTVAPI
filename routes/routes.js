var appRouter = function (app) {

    // We need this to build our post string
    var querystring = require('querystring');
    var http = require('http');
    var fs = require('fs');
    var command = require('../SonyRemoteCommands/Command.js')
    const sonyPreSharedKey = '9498'

    function ExecuteCommand(request, response) {
        if (request.method == 'POST') {
            var body = '';

            request.on('data', function (data) {
                body += data;
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    request.connection.destroy();
            });

            request.on('end', function () {
                let commandExist = true;
                // let cmd = new Command();
                switch (body) {
                    case "channelUp":
                    // todo get dictionary from command 
                    // console.log(command.dict.[body].Value);
                        // PostCode(cmd.getCommand(body));

                        break;
                    default:
                        console.log("dont find ", body);
                        commandExist = false;
                        break;
                }
                if (commandExist) {
                    body += " ok";
                } else {
                    body += " fehler";
                }
            });
        }
    }

    app.get("/", function (req, res) {
        res.send("Sony TV API");
    });



    app.post("/", function (req, res) {
        ExecuteCommand(req, res);

        return res.send(req.body);
    });



    function PostCode(codestring) {
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
                // console.log('Response: ' + chunk);
            });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();

    }



}

module.exports = appRouter;

