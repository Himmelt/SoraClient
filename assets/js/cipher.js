/**
 * Created by Kami on 2016/4/30.
 */
var crypto = require('crypto');

exports.md5 = function (pswd, user) {
    var first = crypto.createHash('md5').update(pswd).digest('hex') + user;
    return crypto.createHash('md5').update(first).digest('hex');
};
exports.encrypt = function (pswd) {
    var code = new Buffer(pswd).toString('base64');
    return new Buffer(code).toString('hex');
};
exports.decrypt = function (code) {
    try {
        var pswd = new Buffer(code, 'hex').toString();
        return new Buffer(pswd, 'base64').toString();
    }
    catch (e) {
        alert(e);
    }
};