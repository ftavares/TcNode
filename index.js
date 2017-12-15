const express = require('express')
const http = require('http');
const app = express()
var cors = require('cors')

app.use(cors());



app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });

app.get('/', function (req, res) {



    var url = req.query.url;

    var options = {
        host: 'tclive',
        port: 8111,
        path: url,//'/guestAuth/app/rest/builds?locator=running:any,branch:branched:any,count:20&ts=15:23:51%20GMT+0100%20(GMT%20Daylight',
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    httpRequest(options).then(function (body) {
        res.send(body);
    });
})

function httpRequest(params) {
    return new Promise(function (resolve, reject) {
        var req = http.request(params, function (res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function () {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function (err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}


app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})