/**
 * Created by Kami on 2016/4/30.
 */
var http = require('http');

exports.request = function (options, callback) {
    var req = http.request(options, function (res) {
        console.log("status:", res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log("储存卡" + chunk);
            callback(chunk);
        });
        res.on('end', function () {
            console.log("end");
        });
    });
    req.on('error', function (err) {
        console.log(err);
        callback(err);
    });
    req.end();
};
