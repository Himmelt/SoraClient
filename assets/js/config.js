/**
 * Created by Kami on 2016/4/30.
 */

var file = require('fs'),
    config = {
        userlist: [],
        gamemode: true,
        keeppswd: true,
        load: function (callback) {
            file.readFile("config.json", "utf-8", function (error, data) {
                if (error) {
                    file.open("config.json", "w+", function (error) {
                        if (error) {
                            console.log(error);
                        }
                        config.save();
                    });
                }
                else {
                    config.copy(JSON.parse(data));
                }
                return callback();
            });
        },
        save: function (callback) {
            file.writeFile('config.json', JSON.stringify(config, null, 4), 'utf-8', function (error) {
                if (error) {
                    console.log(error);
                }
                return callback();
            });
        },
        copy: function (object) {
            for (var key in object) {
                this[key] = object[key];
            }
        }
    };
exports.config = config;